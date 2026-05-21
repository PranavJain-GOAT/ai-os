import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NeuralNet3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.z = 5;

    // Nodes
    const nodeCount = 22;
    const nodePositions = Array.from({ length: nodeCount }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4
    ));

    // Node meshes
    const nodeGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const nodeMeshes = nodePositions.map((pos, i) => {
      const mat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x4D9FFF : i % 3 === 1 ? 0x00FF41 : 0xffffff,
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.copy(pos);
      scene.add(mesh);
      return mesh;
    });

    // Glow halos
    const haloGeo = new THREE.SphereGeometry(0.18, 12, 12);
    nodePositions.forEach((pos, i) => {
      const mat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x4D9FFF : i % 3 === 1 ? 0x00FF41 : 0xffffff,
        transparent: true,
        opacity: 0.07,
      });
      const halo = new THREE.Mesh(haloGeo, mat);
      halo.position.copy(pos);
      scene.add(halo);
    });

    // Edges (lines between nearby nodes)
    const edges = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 2.8) {
          edges.push([i, j]);
        }
      }
    }

    const edgeObjects = edges.map(([a, b]) => {
      const points = [nodePositions[a].clone(), nodePositions[b].clone()];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color: 0x4D9FFF, transparent: true, opacity: 0.15 });
      const line = new THREE.Line(geo, mat);
      scene.add(line);
      return { line, mat };
    });

    // Group for rotation
    const group = new THREE.Group();
    scene.add(group);
    nodeMeshes.forEach(m => { scene.remove(m); group.add(m); });
    edgeObjects.forEach(({ line }) => { scene.remove(line); group.add(line); });
    // also move halos
    const halos = scene.children.filter(c => c !== group);
    halos.forEach(h => { scene.remove(h); group.add(h); });

    // Interaction — drag to rotate
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let velX = 0, velY = 0;
    let autoRotate = true;

    const onMouseDown = (e) => {
      isDragging = true; autoRotate = false;
      lastX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      lastY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      const cy = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      velX = (cx - lastX) * 0.008;
      velY = (cy - lastY) * 0.008;
      group.rotation.y += velX;
      group.rotation.x += velY;
      lastX = cx; lastY = cy;
    };
    const onMouseUp = () => { isDragging = false; setTimeout(() => { autoRotate = true; }, 2000); };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mouseleave", onMouseUp);
    el.addEventListener("touchstart", onMouseDown, { passive: true });
    el.addEventListener("touchmove", onMouseMove, { passive: true });
    el.addEventListener("touchend", onMouseUp);

    // Pulse animation state
    const pulseSpeeds = nodePositions.map(() => 0.5 + Math.random() * 1.5);
    const pulseOffsets = nodePositions.map(() => Math.random() * Math.PI * 2);

    // Animate
    let frameId;
    const animate = (t) => {
      frameId = requestAnimationFrame(animate);
      const time = t * 0.001;

      if (autoRotate) {
        group.rotation.y += 0.003;
        group.rotation.x += 0.001;
      }

      // Pulse node opacity
      nodeMeshes.forEach((mesh, i) => {
        const pulse = 0.6 + 0.4 * Math.sin(time * pulseSpeeds[i] + pulseOffsets[i]);
        mesh.material.opacity = pulse;
      });

      // Pulse edge opacity
      edgeObjects.forEach(({ mat }, i) => {
        mat.opacity = 0.05 + 0.15 * Math.abs(Math.sin(time * 0.4 + i * 0.3));
      });

      renderer.render(scene, camera);
    };
    animate(0);

    // Resize
    const onResize = () => {
      if (!el) return;
      renderer.setSize(el.clientWidth, el.clientHeight);
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mouseleave", onMouseUp);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" style={{ minHeight: 360 }} />
  );
}