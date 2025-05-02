import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MenuCube from './MenuCube';

function App() {
  return (
    <Canvas
      style={{ width: '100%', height: '100vh' }}
      camera={{ 
        position: [6, 6, 6], 
        fov: 50
    }}
    >
      <ambientLight />
      <directionalLight position={[2, 2, 2]} />
      <OrbitControls />
      <MenuCube />
    </Canvas>
  );
}

export default App;
