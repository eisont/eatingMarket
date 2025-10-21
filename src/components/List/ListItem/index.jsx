import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';

const Wrapper = styled.div`
  margin: 10px;
  width: 200px;
  height: 200px;

  background: url(${(pr) => pr.url});
  background-size: cover;
  background-repeat: no-repeat;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;
const Title = styled.div`
  background: yellow;
  padding: 5px;
  border-radius: 5px;
  font-weight: 900;

  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
`;
const Close = styled.div`
  background: #fff;
  padding: 3px;

  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;

  transition: 0.2s;
  &:hover {
    cursor: pointer;
    background: red;
    color: #fff;
    font-weight: 900;
  }
`;

const Modal = styled.div`
  width: 400px;
  height: 500px;
  background: #fababa;

  position: fixed;
  z-index: 9999999999999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Text = styled.div`
  font-size: 30px;
  font-weight: 600;
`;
const FlexBox = styled.div`
  display: flex;
`;
const Bt = styled.div`
  margin: 5px;
  padding: 10px;
  background: #fff;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    font-weight: 900;
    background: #aeaeae;
    color: #fff;
  }
`;

const ListItem = (pr) => {
  const [isModal, setIsModal] = useState(false);

  const Select = (item) => {
    const post = async () => {
      const { data } = await axios.post('http://localhost:3000/users/places', { place: item });
      alert(data.message);
      window.location.reload();
    };
    post();
  };

  const Delete = (id) => {
    axios.delete(`http://localhost:3000/users/places/${id}`);
    window.location.reload();
  };

  return (
    <>
      <Wrapper
        url={`http://localhost:3000/${pr.data.image.src}`}
        onClick={() => {
          pr.title === '맛집 목록' && Select(pr.data);
        }}
      >
        <Title>{pr.data.title}</Title>
        {pr.title === '찜한 목록' && <Close onClick={() => setIsModal(true)}>X</Close>}
      </Wrapper>
      {isModal && (
        <Modal>
          <Text>삭제하시겠습니까?</Text>
          <FlexBox>
            <Bt onClick={() => setIsModal(false)}>취소</Bt>
            <Bt onClick={() => Delete(pr.data.id)}>확인</Bt>
          </FlexBox>
        </Modal>
      )}
    </>
  );
};

export default ListItem;
