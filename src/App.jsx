import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';

export default function App() {
  return (
    <Container>
      <Canvas></Canvas>
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
