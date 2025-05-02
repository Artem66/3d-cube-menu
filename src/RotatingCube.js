import React, { useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const faceLabels = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'];

const facePositions = [
  [0, 0, 1.6],
  [0, 0, -1.6],
  [1.6, 0, 0],
  [-1.6, 0, 0],
  [0, 1.6, 0],
  [0, -1.6, 0],
];

const faceRotations = {
  Home: new THREE.Euler(0, 0, 0),
  About: new THREE.Euler(0, Math.PI, 0),
  Services: new THREE.Euler(0, -Math.PI / 2 + Math.PI, 0),
  Portfolio: new THREE.Euler(0, Math.PI / 2 + Math.PI, 0),
  Blog: new THREE.Euler(-Math.PI / 2, 0, 0),
  Contact: new THREE.Euler(Math.PI / 2, 0, 0),
};

export default function RotatingCube({ activeFace }) {
  const cubeRef = useRef();

  useFrame(() => {
    if (cubeRef.current && activeFace && faceRotations[activeFace]) {
      const target = faceRotations[activeFace];
      cubeRef.current.rotation.set(target.x, target.y, target.z);
    }
  });

  return (
    <group ref={cubeRef}>
      <mesh>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#84c541" />
      </mesh>

      {faceLabels.map((label, i) => (
        <Text
          key={i}
          position={facePositions[i]}
          rotation={[
            faceRotations[label].x,
            faceRotations[label].y,
            faceRotations[label].z
          ]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      ))}
    </group>
  );
}
