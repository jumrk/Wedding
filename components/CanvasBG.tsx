"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Heart() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.25;
    }
  });
  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={1.1}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[1.15, 0.34, 240, 40, 2, 3]} />
        <meshStandardMaterial
          color={"#ff7aa3"}
          metalness={0.7}
          roughness={0.18}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 700;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color={"#ff9bb9"} transparent opacity={0.8} />
    </points>
  );
}

export default function CanvasBG() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 3, 4]} intensity={1.15} />
        <Heart />
        <Particles />
        <Sparkles size={2} count={140} scale={[8, 4, 2]} speed={0.35} />
        <Stars
          radius={50}
          depth={10}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />
      </Canvas>
    </div>
  );
}
