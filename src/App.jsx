import { Canvas, useThree } from '@react-three/fiber';
import styled from 'styled-components';
import PortalMaterial from './components/Portal/PortalMaterial';

export default function App() {
  return (
    <Container>
      <Canvas>
        <PlaneMesh>
          <PortalMaterial />
        </PlaneMesh>
      </Canvas>
    </Container>
  );
}

const Container = styled.div`
  background-color: #242424;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  canvas {
    width: 100%;
    height: 100%;
  }
`;

function PlaneMesh({ children }) {
  const { viewport, size } = useThree();
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      {children}
    </mesh>
  );
}
