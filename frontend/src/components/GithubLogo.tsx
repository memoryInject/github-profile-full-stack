import Image from 'react-bootstrap/Image';

const GithubLogo = () => {
  const path = process.env.PUBLIC_URL;
  const image = '/icons8-github-480.png';
  return (
    <Image
      src={path + image}
      alt="GithubLogo"
      roundedCircle
      style={{ width: '32px', position: 'relative', top: '-2px' }}
    />
  );
};

export default GithubLogo;
