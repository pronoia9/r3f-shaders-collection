import styled from 'styled-components';
import { GPGPUCurl, Portal } from './components';

export default function App() {
  return (
    <Container>
      <Portal />
      {/* <GPGPUCurl /> */}
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
