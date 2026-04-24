import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AICoreGlobe() {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Setup Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.z = 9;

    const group = new THREE.Group();
    scene.add(group);

    // We'll create a glowing particle circle texture dynamically
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d");
    const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(255,255,255,0.8)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 32, 32);
    const particleTexture = new THREE.CanvasTexture(canvas);

    // 1. Inner Core Galaxy (thousands of colored points)
    const particleCount = 2000;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    
    // AIInstall theme colors
    const colorPrimary = new THREE.Color(0x4D9FFF); 
    const colorSecondary = new THREE.Color(0x00FF41);

    for (let i = 0; i < particleCount; i++) {
        // Distribute within a dense inner sphere
        const r = 2.5 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        
        particlePos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        particlePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        particlePos[i * 3 + 2] = r * Math.cos(phi);

        // Mix colors based on distance from center for a gradient core
        const mixRatio = Math.min(1.0, r / 2.5) + (Math.random() * 0.2 - 0.1);
        const color = colorPrimary.clone().lerp(colorSecondary, Math.max(0, Math.min(2.0, mixRatio)));
        particleColors[i * 3] = color.r;
        particleColors[i * 3 + 1] = color.g;
        particleColors[i * 3 + 2] = color.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        map: particleTexture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // 2. Outer Plexus Shell (networking connections)
    const plexusCount = 180;
    const plexusGeo = new THREE.BufferGeometry();
    const plexusPos = new Float32Array(plexusCount * 3);
    const plexusInitialPos = [];

    for (let i = 0; i < plexusCount; i++) {
        const r = 3.2 + Math.random() * 0.8; 
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        plexusPos[i * 3] = x;
        plexusPos[i * 3 + 1] = y;
        plexusPos[i * 3 + 2] = z;

        plexusInitialPos.push({ x, y, z, seed: Math.random() * 100 });
    }

    plexusGeo.setAttribute("position", new THREE.BufferAttribute(plexusPos, 3));

    const plexusMat = new THREE.PointsMaterial({
        color: 0x4D9FFF,
        size: 0.16,
        transparent: true,
        opacity: 0.8,
        map: particleTexture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    
    const plexusPoints = new THREE.Points(plexusGeo, plexusMat);
    group.add(plexusPoints);

    const linesGeo = new THREE.BufferGeometry();
    const linesMat = new THREE.LineBasicMaterial({
        color: 0x4D9FFF,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    const plexusLines = new THREE.LineSegments(linesGeo, linesMat);
    group.add(plexusLines);

    // Mouse Tracking Logic
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      // Calculate normalized coordinates (-1 to 1)
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };
    el.addEventListener("mousemove", onMouseMove);

    // Animation Loop
    let frame;
    const currentRotation = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const animate = (t) => {
      frame = requestAnimationFrame(animate);
      const time = t * 0.001;

      // Mouse Parallax & Smooth Rotation
      targetRotation.y = mouseRef.current.x * 0.8;
      targetRotation.x = mouseRef.current.y * 0.5;
      
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.04;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.04;

      // Compound rotation: baseline passive spin + interactive user spin
      group.rotation.x = currentRotation.x + Math.sin(time * 0.2) * 0.15;
      group.rotation.y = currentRotation.y + time * 0.08;
      group.rotation.z = Math.sin(time * 0.15) * 0.1;

      // 1. Gently "breathe" the core particles
      particleMat.opacity = 0.5 + 0.3 * Math.sin(time * 1.5);
      
      // 2. Animate the plexus nodes (wobble them slightly)
      const positions = plexusGeo.attributes.position.array;
      for (let i = 0; i < plexusCount; i++) {
         const init = plexusInitialPos[i];
         positions[i * 3]     = init.x + Math.sin(time * 0.8 + init.seed) * 0.15;
         positions[i * 3 + 1] = init.y + Math.cos(time * 0.9 + init.seed) * 0.15;
         positions[i * 3 + 2] = init.z + Math.sin(time * 1.1 + init.seed) * 0.15;
      }
      plexusGeo.attributes.position.needsUpdate = true;

      // 3. Re-calculate network lines every frame for the floating nodes
      // (Using O(N^2) which is fine for N=180 nodes -> ~16,110 iterations)
      const linePositions = [];
      const thresholdSq = 2.4 * 2.4; // Max distance between nodes
      
      for (let i = 0; i < plexusCount; i++) {
        for (let j = i + 1; j < plexusCount; j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < thresholdSq) {
                linePositions.push(
                    positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                    positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                );
            }
        }
      }
      
      // Update line geometry dynamically
      linesGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

      renderer.render(scene, camera);
    };
    
    animate(0);

    // Responsive Canvas
    const onResize = () => {
      if (!el) return;
      renderer.setSize(el.clientWidth, el.clientHeight);
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      el.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      plexusGeo.dispose();
      plexusMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      particleTexture.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full cursor-crosshair active:scale-95 transition-transform duration-700" style={{ minHeight: "400px" }} />;
}