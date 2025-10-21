import styled from '@emotion/styled';
import List from '../components/List';
import { useFetch } from '../api/useFetch';
import { useEffect, useState } from 'react';
import { sortPlacesByDistance } from '../shared/lib/sortPlacesByDistance';

const Wrapper = styled.div`
  width: 100vwh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #aeaeae;
`;

const Layout = () => {
  const [position, setPosition] = useState({ lat: 0, lon: 0 });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => setPosition({ lat: position.coords.latitude, lon: position.coords.longitude }));
  }, []);

  const [{ places }, isLoading, err] = useFetch({ path: 'places' });
  const [{ places: user }, userIsLoading] = useFetch({ path: 'users/places' });

  const placesResult = sortPlacesByDistance(places || [], position.lat, position.lon);

  return (
    <Wrapper>
      <List text='찜한 목록' data={user} isLoading={userIsLoading} error={err} />
      <List text='맛집 목록' data={placesResult} isLoading={isLoading} error={err} />
    </Wrapper>
  );
};

export default Layout;
