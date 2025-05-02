import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MenuCube from './MenuCube';
import { Vector3, Spherical } from 'three';

function CameraLerp({ controlsRef, target, onArrive }) {
  const spherical = useRef(new Spherical());
  const targetVec = useRef(new Vector3());

  useFrame(() => {
    if (!controlsRef.current || !target) return;

    const controls = controlsRef.current;
    const camera = controls.object;

    const currentPos = camera.position;
    targetVec.current.copy(target);

    const currentSpherical = new Spherical().setFromVector3(currentPos.clone());
    const targetSpherical = new Spherical().setFromVector3(targetVec.current);

    spherical.current.radius = 6;
    spherical.current.theta = lerpAngle(currentSpherical.theta, targetSpherical.theta, 0.05);
    spherical.current.phi = lerpAngle(currentSpherical.phi, targetSpherical.phi, 0.05);

    const newPos = new Vector3().setFromSpherical(spherical.current);
    camera.position.copy(newPos);
    controls.target.lerp(new Vector3(0, 0, 0), 0.1);
    controls.update();

    // If the camera is close enough to the target, stop animating
    if (newPos.distanceTo(target) < 0.01) {
      onArrive(); // Notify parent to clear target
    }
  });

  return null;
}

function lerpAngle(a, b, t) {
  const delta = ((((b - a) % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
  return a + delta * t;
}

function App() {
  const controlsRef = useRef();
  const [targetPosition, setTargetPosition] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const cameraPositions = {
    Home: new Vector3(0, 0, 6),
    About: new Vector3(0, 0, -6),
    Services: new Vector3(6, 0, 0),
    Portfolio: new Vector3(-6, 0, 0),
    Blog: new Vector3(0, 6, 0),
    Contact: new Vector3(0, -6, 0),
  };

  const handleHover = (label) => {
    if (!isInteracting) {
      const pos = cameraPositions[label];
      if (pos) setTargetPosition(pos.clone());
    }
  };

  const handleArrive = () => {
    setTargetPosition(null); // Stop animating once arrived
  };

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const onStart = () => {
      setIsInteracting(true);
      setTargetPosition(null); // Cancel any auto-animation
    };

    const onEnd = () => {
      setIsInteracting(false);
    };

    controls.addEventListener('start', onStart);
    controls.addEventListener('end', onEnd);

    return () => {
      controls.removeEventListener('start', onStart);
      controls.removeEventListener('end', onEnd);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setTargetPosition(cameraPositions.Blog.clone());
          break;
        case 'ArrowDown':
          setTargetPosition(cameraPositions.Contact.clone());
          break;
        case 'ArrowLeft':
          setTargetPosition(cameraPositions.Portfolio.clone());
          break;
        case 'ArrowRight':
          setTargetPosition(cameraPositions.Services.clone());
          break;
        case '1':
          setTargetPosition(cameraPositions.Home.clone());
          break;
        case '2':
          setTargetPosition(cameraPositions.About.clone());
          break;
        default:
          break;
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  

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

      <Canvas style={{ width: '100%', height: '100vh' }} camera={{ position: [0, 0, 6], fov: 75 }}>
        <ambientLight />
        <directionalLight position={[2, 2, 2]} />
        <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.1} />
        {targetPosition && (
          <CameraLerp controlsRef={controlsRef} target={targetPosition} onArrive={handleArrive} />
        )}
        <MenuCube />
      </Canvas>
    </>
  );
}

export default App;
