import { useThree } from '@react-three/fiber';

export default function PlaneMesh({ children }) {
  const { viewport, size } = useThree();
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      {children}
    </mesh>
  );
}
