import React, { useState, useEffect } from 'react';

function HydraulicCylinder({ extended }) {
  const pistonLength = extended ? 3 : 1.5;

  return (
    <group>
      {/* Barrel (outer casing) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Piston Rod */}
      <mesh position={[0, pistonLength / 2 + 2, 0]}>
        <cylinderGeometry args={[0.2, 0.2, pistonLength, 32]} />
        <meshStandardMaterial color="silver" />
      </mesh>

      {/* Top Cap */}
      <mesh position={[0, 4 / 2 + 0.1, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}

export default function AnimatedCylinder() {
  const [extended, setExtended] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setExtended((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return <HydraulicCylinder extended={extended} />;
}
