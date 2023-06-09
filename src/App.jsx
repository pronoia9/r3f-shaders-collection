import styled from 'styled-components';
import { GPGPUCurl, NeonShapes, NoisyColorV1, Portal, PortalV2 } from './components';

export default function App() {
  return (
    <Container>
      {/* <Portal /> */}
      {/* <GPGPUCurl /> */}
      {/* <PortalV2 /> */}
      {/* <NeonShapes /> */}
      <NoisyColorV1 />
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
