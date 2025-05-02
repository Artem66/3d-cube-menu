import React from 'react';
import { Text } from '@react-three/drei';

const faceLabels = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'];
const facePositions = [
  [0, 0, 1.6],    // Front
  [0, 0, -1.6],   // Back
  [1.6, 0, 0],    // Right
  [-1.6, 0, 0],   // Left
  [0, 1.6, 0],    // Top
  [0, -1.6, 0],   // Bottom
];
const faceRotations = [
  [0, 0, 0],                      // Front
  [0, Math.PI, 0],               // Back
  [0, -Math.PI / 2 + Math.PI, 0],  // Right (Services) ← fix here
  [0, Math.PI / 2 + Math.PI, 0],   // Left (Portfolio) ← and here
  [-Math.PI / 2, 0, 0],          // Top
  [Math.PI / 2, 0, 0],           // Bottom
];

export default function MenuCube() {
  const handleClick = (label) => {
    alert(`Clicked on ${label}`);
    // window.location.href = `/${label.toLowerCase()}`;
  };

  return (
    <group>
      <mesh>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#84c541" />
      </mesh>

      {faceLabels.map((label, i) => (
        <Text
          key={i}
          position={facePositions[i]}
          rotation={faceRotations[i]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          onClick={() => handleClick(label)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'default')}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}
