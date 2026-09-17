import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useLanguage } from '../context/LanguageContext';

export const CosmicStarfield: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useLanguage();

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Check device performance / width
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 650 : 1800;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070b1f, 0.0008);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 1000;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Geometry & Attributes
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    // Cosmic color palette: Cyan, Sky Blue, Soft Violet, Diamond White
    const palette = [
      new THREE.Color('#22D3EE'), // Cyan
      new THREE.Color('#38BDF8'), // Sky Blue
      new THREE.Color('#818CF8'), // Soft Violet
      new THREE.Color('#F0FDF4'), // Pure star white
      new THREE.Color('#C7D2FE'), // Pale Indigo
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // Spread across 3D space
      positions[i3] = (Math.random() - 0.5) * 2200;
      positions[i3 + 1] = (Math.random() - 0.5) * 2200;
      positions[i3 + 2] = (Math.random() - 0.5) * 2000;

      // Color selection
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Depth sizing
      sizes[i] = Math.random() * 2.6 + 0.8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // 5. Shader Material with circular soft falloff
    const starMaterial = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(geometry, starMaterial);
    scene.add(starField);

    // Subtle deep nebula dust particle cloud
    const nebulaCount = isMobile ? 80 : 220;
    const nebulaGeometry = new THREE.BufferGeometry();
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);

    for (let i = 0; i < nebulaCount; i++) {
      const i3 = i * 3;
      nebulaPositions[i3] = (Math.random() - 0.5) * 1600;
      nebulaPositions[i3 + 1] = (Math.random() - 0.5) * 1600;
      nebulaPositions[i3 + 2] = (Math.random() - 0.5) * 1200;

      const col = Math.random() > 0.5 ? new THREE.Color('#38BDF8') : new THREE.Color('#6366F1');
      nebulaColors[i3] = col.r;
      nebulaColors[i3 + 1] = col.g;
      nebulaColors[i3 + 2] = col.b;
    }
    nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

    const nebulaMaterial = new THREE.PointsMaterial({
      size: 14,
      vertexColors: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nebulaField = new THREE.Points(nebulaGeometry, nebulaMaterial);
    scene.add(nebulaField);

    // 6. Interaction listeners (Mouse parallax and scroll)
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX - window.innerWidth / 2) * 0.4;
      targetMouseY = (event.clientY - window.innerHeight / 2) * 0.4;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 7. Resize handling
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (reducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      const delta = clock.getDelta();

      // Smooth interpolation for mouse parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.08;

      camera.position.x = mouseX * 0.3;
      camera.position.y = -mouseY * 0.3 - scrollY * 0.5;
      camera.lookAt(0, -scrollY * 0.5, 0);

      // Slow orbital drift
      starField.rotation.y += delta * 0.02;
      starField.rotation.x += delta * 0.008;
      nebulaField.rotation.y -= delta * 0.012;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      starMaterial.dispose();
      nebulaGeometry.dispose();
      nebulaMaterial.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      id="cosmic-starfield-canvas"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
