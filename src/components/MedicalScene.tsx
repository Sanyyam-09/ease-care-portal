import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const Capsule = ({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.3;
      ref.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.2) * 0.2;
    }
  });
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={ref} position={position}>
        <capsuleGeometry args={[0.18, 0.5, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} transparent opacity={0.85} />
      </mesh>
    </Float>
  );
};

const Pill = ({ position, color1, color2, speed = 1 }: { position: [number, number, number]; color1: string; color2: string; speed?: number }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.15) * 0.4;
    }
  });
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={2}>
      <group ref={ref} position={position}>
        <mesh position={[0, 0.2, 0]}>
          <capsuleGeometry args={[0.15, 0.2, 8, 16]} />
          <meshStandardMaterial color={color1} roughness={0.25} metalness={0.15} transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.15, 0.2, 8, 16]} />
          <meshStandardMaterial color={color2} roughness={0.25} metalness={0.15} transparent opacity={0.8} />
        </mesh>
      </group>
    </Float>
  );
};

const HeartBeat = ({ position, speed = 1 }: { position: [number, number, number]; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * speed * 2) * 0.15;
      ref.current.scale.set(scale, scale, scale);
    }
  });
  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <MeshDistortMaterial color="#FF4D4D" roughness={0.4} metalness={0.1} distort={0.3} speed={2} transparent opacity={0.7} />
      </mesh>
    </Float>
  );
};

const Stethoscope = ({ position, speed = 1 }: { position: [number, number, number]; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.3;
    }
  });
  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={1.8}>
      <mesh ref={ref} position={position}>
        <torusGeometry args={[0.3, 0.06, 16, 32]} />
        <meshStandardMaterial color="#2A7FFF" roughness={0.2} metalness={0.3} transparent opacity={0.75} />
      </mesh>
    </Float>
  );
};

const DNAHelix = ({ position, speed = 1 }: { position: [number, number, number]; speed?: number }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.4;
    }
  });
  return (
    <Float speed={speed * 0.5} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={ref} position={position}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[Math.sin(i * 0.8) * 0.2, i * 0.12 - 0.5, Math.cos(i * 0.8) * 0.2]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#1EC6B6" : "#2A7FFF"} roughness={0.3} transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const CrossShape = ({ position, speed = 1 }: { position: [number, number, number]; speed?: number }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.15;
    }
  });
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.2}>
      <group ref={ref} position={position}>
        <mesh>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
          <meshStandardMaterial color="#1EC6B6" roughness={0.3} metalness={0.1} transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
          <meshStandardMaterial color="#1EC6B6" roughness={0.3} metalness={0.1} transparent opacity={0.7} />
        </mesh>
      </group>
    </Float>
  );
};

const MedicalScene = () => {
  return (
    <div className="absolute inset-0 -z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 2, 4]} intensity={0.4} color="#2A7FFF" />
        <pointLight position={[3, -2, 4]} intensity={0.4} color="#1EC6B6" />

        {/* Scattered medical objects */}
        <Capsule position={[-3.2, 1.8, 0]} color="#2A7FFF" speed={0.8} />
        <Capsule position={[3.5, -1.5, -1]} color="#1EC6B6" speed={1.2} />
        <Pill position={[-2.8, -1.8, 0.5]} color1="#FF4D4D" color2="#ffffff" speed={0.9} />
        <Pill position={[2.5, 2, -0.5]} color1="#2A7FFF" color2="#ffffff" speed={1.1} />
        <HeartBeat position={[-3.8, 0, 0]} speed={1} />
        <Stethoscope position={[3.8, 0.5, 0]} speed={0.7} />
        <DNAHelix position={[0, 2.8, -1]} speed={0.6} />
        <DNAHelix position={[-1.5, -2.5, -0.5]} speed={0.8} />
        <CrossShape position={[3, -2.5, 0]} speed={0.5} />
        <CrossShape position={[-3.5, 2.5, -1]} speed={0.9} />
        <Capsule position={[1.5, -2.8, 0.5]} color="#FF4D4D" speed={0.6} />
        <Stethoscope position={[-2, 0.5, -1]} speed={1} />
      </Canvas>
    </div>
  );
};

export default MedicalScene;
