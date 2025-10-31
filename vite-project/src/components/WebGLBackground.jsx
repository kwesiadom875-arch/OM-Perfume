import React, { useRef, useEffect, useLayoutEffect, useState } from 'react'; // Added useLayoutEffect, useState
import * as THREE from 'three';

// --- Shader Code (Distortion Shader) ---
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse; // Mouse position relative to the canvas (0.0 to 1.0)
  uniform float u_time;

  vec2 distort(vec2 uv, vec2 mousePos, float intensity, float radius) {
    vec2 direction = uv - mousePos;
    float distance = length(direction);
    if (distance < radius) {
      float distortionFactor = smoothstep(radius, 0.0, distance);
      float wave = sin(distance * 20.0 - u_time * 2.0);
      vec2 offset = normalize(direction) * distortionFactor * intensity * wave;
      return uv + offset;
    }
    return uv;
  }

  void main() {
    float distortionIntensity = 0.03;
    float distortionRadius = 0.25; // Relative to canvas size now
    vec2 distortedUv = distort(vUv, u_mouse, distortionIntensity, distortionRadius);
    vec4 textureColor = texture2D(u_texture, distortedUv);
    gl_FragColor = textureColor;
  }
`;
// --- End Shader Code ---


function WebGLBackground({ className }) { // Accept className prop
  const containerRef = useRef(); // Ref for the container div
  const canvasRef = useRef();
  const rendererRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const materialRef = useRef();
  const textureRef = useRef();
  const planeRef = useRef(); // Ref for the plane mesh
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });
  const clockRef = useRef(new THREE.Clock());

  // State to hold container dimensions
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Use useLayoutEffect to measure container size before painting
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial dimensions
    setDimensions({ width: container.clientWidth, height: container.clientHeight });

    // Use ResizeObserver to update dimensions when container size changes
    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });
    resizeObserver.observe(container);

    // Cleanup observer on unmount
    return () => resizeObserver.disconnect();
  }, []); // Run only once on mount

  // useEffect for Three.js setup and updates based on dimensions
  useEffect(() => {
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return; // Don't initialize if size is zero

    const canvas = canvasRef.current;
    const scene = sceneRef.current || new THREE.Scene();
    sceneRef.current = scene;

    const camera = cameraRef.current || new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cameraRef.current = camera;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    camera.position.z = 1; // Adjust if needed based on plane size

    const renderer = rendererRef.current || new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Texture (Load only once or if needed) ---
    if (!textureRef.current) {
        const textureLoader = new THREE.TextureLoader();
        textureRef.current = textureLoader.load(
            '/images/hero-banner.jpg', // Path from 'public'
            (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                if (materialRef.current) materialRef.current.uniforms.u_texture.value = texture;
                adjustPlaneScale(); // Adjust plane on texture load
            },
            undefined,
            (err) => { console.error('Error loading WebGL texture:', err); }
        );
        textureRef.current.minFilter = THREE.LinearFilter;
        textureRef.current.magFilter = THREE.LinearFilter;
    }

    // --- Shader Material (Create or update uniforms) ---
    if (!materialRef.current) {
        materialRef.current = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                u_time: { value: 0.0 },
                u_resolution: { value: new THREE.Vector2(width, height) },
                u_mouse: { value: new THREE.Vector2(mousePositionRef.current.x, mousePositionRef.current.y) },
                u_texture: { value: textureRef.current }
            }
        });
    } else {
        // Update resolution if already created
        materialRef.current.uniforms.u_resolution.value.set(width, height);
    }

    // --- Full Screen Plane (Create only once) ---
    if (!planeRef.current) {
        const geometry = new THREE.PlaneGeometry(1, 1); // Unit size, scale later
        planeRef.current = new THREE.Mesh(geometry, materialRef.current);
        scene.add(planeRef.current);
    }

    // Function to adjust plane scale based on container and texture aspect
    const adjustPlaneScale = () => {
        if (!textureRef.current?.image || !cameraRef.current || !planeRef.current) return;
        const imageAspect = textureRef.current.image.naturalWidth / textureRef.current.image.naturalHeight;
        const viewAspect = width / height;
        const camera = cameraRef.current;
        const fov = camera.fov * (Math.PI / 180);
        const viewHeight = 2 * Math.tan(fov / 2) * camera.position.z;
        const viewWidth = viewHeight * viewAspect;

        let planeWidth, planeHeight;
        // Cover logic (similar to background-size: cover)
        if (imageAspect > viewAspect) { // Image wider than container
            planeHeight = viewHeight;
            planeWidth = planeHeight * imageAspect;
        } else { // Image taller than container
            planeWidth = viewWidth;
            planeHeight = planeWidth / imageAspect;
        }
        planeRef.current.scale.set(planeWidth, planeHeight, 1);
    };

    adjustPlaneScale(); // Adjust scale initially and on resize

    // --- Mouse Move Listener (Relative to Container) ---
    const handleMouseMove = (event) => {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        // Calculate mouse position relative to container, normalized (0.0 to 1.0)
        mousePositionRef.current.x = (event.clientX - rect.left) / rect.width;
        mousePositionRef.current.y = 1.0 - ((event.clientY - rect.top) / rect.height); // Invert Y
        // Clamp values between 0 and 1 to avoid issues at edges
        mousePositionRef.current.x = Math.max(0, Math.min(1, mousePositionRef.current.x));
        mousePositionRef.current.y = Math.max(0, Math.min(1, mousePositionRef.current.y));

        if (materialRef.current) {
             materialRef.current.uniforms.u_mouse.value.set(mousePositionRef.current.x, mousePositionRef.current.y);
        }
    };
    // Attach listener to the container div instead of window
    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    // Optional: Reset mouse position when leaving container
    const handleMouseLeave = () => {
        mousePositionRef.current = { x: 0.5, y: 0.5 }; // Reset to center
         if (materialRef.current) {
             materialRef.current.uniforms.u_mouse.value.set(mousePositionRef.current.x, mousePositionRef.current.y);
        }
    }
    container.addEventListener('mouseleave', handleMouseLeave);


    // --- Animation Loop ---
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (materialRef.current) materialRef.current.uniforms.u_time.value = clockRef.current.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    // --- Cleanup ---
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      // Don't dispose renderer/scene here if App manages it, but necessary if component unmounts
      // Consider disposing geometry/material/texture if they are specific to this instance
    };
  }, [dimensions]); // Re-run effect if container dimensions change

  // Render a container div and the canvas inside it
  return (
    <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ display: 'block' }} /> {/* Basic canvas style */}
    </div>
  );
}

export default WebGLBackground;