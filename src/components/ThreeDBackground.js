import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDBackground = () => {
  const containerRef = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });
  const particlesMeshRef = useRef();
  const gridHelperRef = useRef();
  const rendererRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();

  useEffect(() => {
    const currentContainer = containerRef.current;

    // Configuration de base
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentContainer.appendChild(renderer.domElement);

    // Grille améliorée
    const gridHelper = new THREE.GridHelper(30, 30, 0x00fff9, 0xFF00FF);
    gridHelper.position.y = -2;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.15;
    gridHelperRef.current = gridHelper;
    scene.add(gridHelper);

    // Particules améliorées
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
      if (i % 3 === 0) scaleArray[i / 3] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));

    // Shader personnalisé pour les particules
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0x00fff9) },
        uColor2: { value: new THREE.Color(0xFF00FF) },
        uMouse: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        attribute float scale;
        varying vec3 vColor;
        
        void main() {
          vec3 pos = position;
          pos.x += sin(uTime * 0.001 + pos.z * 0.5) * 0.1;
          pos.y += cos(uTime * 0.001 + pos.x * 0.5) * 0.1;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          float distanceToMouse = length(pos.xy - uMouse);
          float influence = smoothstep(2.0, 0.0, distanceToMouse);
          mvPosition.xyz += normalize(pos) * influence * 0.2;
          
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = scale * 2.0 * (1.0 + influence);
          
          vColor = mix(vec3(0.0, 1.0, 0.98), vec3(1.0, 0.0, 1.0), influence);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float strength = distance(gl_PointCoord, vec2(0.5));
          strength = 1.0 - strength;
          strength = pow(strength, 3.0);
          
          vec3 finalColor = vColor;
          gl_FragColor = vec4(finalColor, strength * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesMeshRef.current = particlesMesh;
    scene.add(particlesMesh);

    // Gestion de la souris
    const handleMouseMove = (event) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let time = 0;
    const animate = () => {
      time += 1;
      
      if (particlesMeshRef.current) {
        particlesMeshRef.current.rotation.y += 0.0005;
        particlesMeshRef.current.material.uniforms.uTime.value = time;
        particlesMeshRef.current.material.uniforms.uMouse.value.x = mousePosition.current.x;
        particlesMeshRef.current.material.uniforms.uMouse.value.y = mousePosition.current.y;
      }

      if (gridHelperRef.current) {
        gridHelperRef.current.rotation.y += 0.0005;
        gridHelperRef.current.position.y = -2 + Math.sin(time * 0.001) * 0.2;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      requestAnimationFrame(animate);
    };

    animate();

    // Gestion du redimensionnement
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentContainer && rendererRef.current) {
        currentContainer.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10"
      style={{ 
        background: 'linear-gradient(to bottom, #0a0a0f 0%, #1a1a24 100%)',
        pointerEvents: 'none' 
      }}
    />
  );
};

export default ThreeDBackground; 