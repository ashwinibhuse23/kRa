import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MedicalParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── 1. Scene, Camera & Transparent Renderer ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // 100% transparent background

    const canvas = renderer.domElement;
    canvas.className = 'w-full h-full block pointer-events-none';
    container.appendChild(canvas);

    // ── 2. Create Crisp Circular Particle Sprite Texture ──
    const createCircleTexture = () => {
      const size = 64;
      const cvs = document.createElement('canvas');
      cvs.width = size;
      cvs.height = size;
      const ctx = cvs.getContext('2d');
      if (ctx) {
        const center = size / 2;
        // Defined core with smooth anti-aliased edge (not washed out or overly blurry)
        const gradient = ctx.createRadialGradient(
          center,
          center,
          0,
          center,
          center,
          center
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.45, 'rgba(255, 255, 255, 0.95)');
        gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.45)');
        gradient.addColorStop(0.95, 'rgba(255, 255, 255, 0.08)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(center, center, center * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(cvs);
    };

    const particleTexture = createCircleTexture();

    // ── 3. Medical Field Particles Geometry (Small, light & clean) ──
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number; phase: number; speed: number }[] = [];

    // Light clinical palette: medical blue, cyan, sky, soft coral
    const palette = [
      new THREE.Color('#0078B8'), // kRa signature blue
      new THREE.Color('#0284C7'), // rich clinical blue
      new THREE.Color('#00A8CC'), // clean cyan
      new THREE.Color('#0EA5E9'), // sky medical blue
      new THREE.Color('#38BDF8'), // light sky
      new THREE.Color('#CF3838'), // subtle micro red accent
    ];

    for (let i = 0; i < particleCount; i++) {
      // Disperse across the full width and height of the section view
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      // Pick from medical palette with clear tones
      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      velocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: Math.random() * 0.004 + 0.002, // Gentle upward medical suspension drift
        z: (Math.random() - 0.5) * 0.002,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.008,
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Points Material with clear visible definition
    const material = new THREE.PointsMaterial({
      size: 0.22, // Visible, crisp medical particle size
      map: particleTexture,
      transparent: true,
      opacity: 0.72, // Clearly visible without being intrusive
      vertexColors: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ── 4. Tiny Translucent Bio-Vesicles / Molecular Nodes (No lines, clean visibility) ──
    const vesicleCount = 16;
    const vesicleGroup = new THREE.Group();
    const vesicleData: { mesh: THREE.Mesh; initY: number; speedY: number; rotSpeed: number; floatAmp: number }[] = [];

    const sphereGeo = new THREE.SphereGeometry(0.08, 16, 16);

    for (let i = 0; i < vesicleCount; i++) {
      const color = palette[i % palette.length];
      const sphereMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: Math.random() * 0.14 + 0.12, // Visible translucent floating node
        wireframe: false,
      });

      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 8;
      const scale = Math.random() * 0.8 + 0.7;

      mesh.position.set(x, y, z);
      mesh.scale.set(scale, scale, scale);

      vesicleGroup.add(mesh);
      vesicleData.push({
        mesh,
        initY: y,
        speedY: Math.random() * 0.003 + 0.0015,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        floatAmp: Math.random() * 0.4 + 0.2,
      });
    }

    scene.add(vesicleGroup);

    // ── 5. Subtle Mouse Parallax Response ──
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.6;
      targetMouseY = y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ── 6. Animation Loop (Smooth 60FPS fluid drift) ──
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      camera.position.x = mouseX * 0.8;
      camera.position.y = mouseY * 0.6;
      camera.lookAt(0, 0, 0);

      // Animate Point Particles
      const posAttr = geometry.attributes.position;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const vel = velocities[i];

        // Soft vertical float
        posArray[i * 3 + 1] += vel.y;

        // Subtle horizontal sinus oscillation (cellular suspension effect)
        posArray[i * 3] += Math.sin(elapsed * vel.speed + vel.phase) * 0.004;

        // Reset particle if it drifts above top
        if (posArray[i * 3 + 1] > 8.5) {
          posArray[i * 3 + 1] = -8.5;
          posArray[i * 3] = (Math.random() - 0.5) * 26;
        }
      }
      posAttr.needsUpdate = true;

      // Animate Translucent Bio-Vesicles
      vesicleData.forEach((v, idx) => {
        v.mesh.position.y += v.speedY;
        v.mesh.position.x += Math.sin(elapsed * 0.4 + idx) * 0.002;
        v.mesh.rotation.y += v.rotSpeed;

        if (v.mesh.position.y > 8) {
          v.mesh.position.y = -8;
          v.mesh.position.x = (Math.random() - 0.5) * 24;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // ── 7. Resize Observer ──
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // ── 8. Cleanup on Unmount ──
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();

      geometry.dispose();
      material.dispose();
      sphereGeo.dispose();
      particleTexture.dispose();

      vesicleData.forEach((v) => {
        if (Array.isArray(v.mesh.material)) {
          v.mesh.material.forEach((m) => m.dispose());
        } else {
          v.mesh.material.dispose();
        }
      });

      renderer.dispose();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    />
  );
}
