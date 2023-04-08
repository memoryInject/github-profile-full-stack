import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

import Repos from './Repos';

const App = () => {
  const [userProfile, setUserProfile] = useState({
    login: 'memoryInject',
    avatarUrl: 'https://avatars.githubusercontent.com/u/72661846?v=4',
    name: 'Mahesh MS',
    location: 'Shenzhen, China',
    email: null,
    publicRepos: 14,
    privateRepos: 0,
    bio:
      'Full-stack developer. \r\n' +
      'Working with Python, JavaScript, TypeScript, NodeJS, Django, Flask, React, Docker and Kubernetes.',
  });
  return (
    <Container className="py-4">
      <Row
        className="justify-content-md-center bg-dark mx-4"
        style={{ borderRadius: '8px' }}
      >
        <Col md="auto" className="p-4 text-center">
          <Image
            src={userProfile.avatarUrl}
            alt={userProfile.login}
            roundedCircle
            style={{ width: '150px' }}
          />
          <h1>{userProfile.name}</h1>
          <p>{userProfile.login}</p>
        </Col>
        <Col className="p-4">
          <h4>Bio</h4>
          <p>{userProfile.bio}</p>
          <div>
            <span className="fw-semibold">Location : </span>
            <span>{userProfile.location}</span>
          </div>
          <div>
            <span className="fw-semibold">
              Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{' '}
            </span>
            {userProfile.email ? (
              <span>{userProfile.email}</span>
            ) : (
              <span>Private</span>
            )}
          </div>
          <Button className="my-3">Go to Github</Button>
          <div>
            <Badge bg="success">Public Repos: {userProfile.publicRepos}</Badge>{' '}
            <Badge bg="danger">Private Repos: {userProfile.privateRepos}</Badge>{' '}
          </div>
        </Col>
      </Row>
      <Repos />
    </Container>
  );
};

export default App;
