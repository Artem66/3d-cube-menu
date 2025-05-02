import React from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

const faceLabels = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'];
const facePositions = [
  [0, 0, 0.51],   // Front
  [0, 0, -0.51],  // Back
  [0.51, 0, 0],   // Right
  [-0.51, 0, 0],  // Left
  [0, 0.51, 0],   // Top
  [0, -0.51, 0],  // Bottom
];

const faceRotations = [
  [0, 0, 0],                  // Front
  [0, Math.PI, 0],            // Back
  [0, -Math.PI / 2, 0],       // Right
  [0, Math.PI / 2, 0],        // Left
  [-Math.PI / 2, 0, 0],       // Top
  [Math.PI / 2, 0, 0],        // Bottom
];

export default function MenuCube() {
  return (
    <group>
      {/* Cube Mesh */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="lightblue" wireframe={false} />
      </mesh>

      {/* Text Labels */}
      {faceLabels.map((label, i) => (
        <Text
          key={i}
          position={facePositions[i]}
          rotation={faceRotations[i]}
          fontSize={0.1}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      ))}
    </group>
  );
}
