import Layout from '../layout';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

function App() {
  return (
    <Wrapper>
      <Layout />
    </Wrapper>
  );
}

export default App;
