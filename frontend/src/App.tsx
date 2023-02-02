import React, { useEffect, useState } from 'react';
import './bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const App = () => {

  const [userProfile, setUserProfile] = useState({
    login: 'memoryInject',
    avatarUrl: 'https://avatars.githubusercontent.com/u/72661846?v=4',
    name: 'Mahesh MS',
    location: 'Shenzhen, China',
    email: null,
    publicRepos: 14,
    privateRepos: 0,
  })
  return <></>;
};

export default App;
