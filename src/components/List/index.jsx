import styled from '@emotion/styled';
import { lazy, Suspense } from 'react';
const ListItem = lazy(() => import('./ListItem'));

const Wrapper = styled.div`
  margin: 20px 0%;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const MainBox = styled.div`
  width: 90%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #fff;
`;
const Title = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 900;
`;
const DataBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const List = (pr) => {
  return (
    <Wrapper>
      <MainBox>
        <Title>{pr.text}</Title>
        <DataBox>
          <Suspense fallback={<h2>데이터를 불러오는 중입니다...</h2>}>
            {pr.error ? (
              <h2 style={{ color: 'red' }}>{`요청하신 데이터를 찾을 수 없습니다. (${pr.error.status})`} </h2>
            ) : (
              <>
                {pr.isLoading ? (
                  <h2>데이터를 불러오는 중입니다...</h2>
                ) : (
                  <>
                    {pr.data?.length ? (
                      <>
                        {pr.data?.map((el) => (
                          <ListItem key={el.id} data={el} title={pr.text} />
                        ))}
                      </>
                    ) : (
                      <>찜한 리스트가 없습니다.</>
                    )}
                  </>
                )}
              </>
            )}
          </Suspense>
        </DataBox>
      </MainBox>
    </Wrapper>
  );
};

export default List;
