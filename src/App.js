import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MenuCube from './MenuCube';
import { Vector3 } from 'three';

function App() {
  const controlsRef = useRef();
  const [targetFace, setTargetFace] = useState(null);

  // Face to camera position mapping
  const cameraPositions = {
    Home: new Vector3(0, 0, 6),
    About: new Vector3(0, 0, -6),
    Services: new Vector3(6, 0, 0),
    Portfolio: new Vector3(-6, 0, 0),
    Blog: new Vector3(0, 6, 0),
    Contact: new Vector3(0, -6, 0),
  };

  const handleHover = (label) => {
    const pos = cameraPositions[label];
    if (pos && controlsRef.current) {
      controlsRef.current.object.position.copy(pos); // camera position
      controlsRef.current.target.set(0, 0, 0);       // center of cube
      controlsRef.current.update();
    }
  };

  return (
    <>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
        {Object.keys(cameraPositions).map((label) => (
          <div
            key={label}
            onMouseEnter={() => handleHover(label)}
            style={{ marginBottom: '10px', cursor: 'pointer' }}
          >
            {label}
          </div>
        ))}
      </div>

      <Canvas style={{ width: '100%', height: '100vh' }} camera={{ position: [3, 3, 3], fov: 100 }}>
        <ambientLight />
        <directionalLight position={[2, 2, 2]} />
        <OrbitControls ref={controlsRef} />
        <MenuCube />
      </Canvas>
    </>
  );
}

export default App;
