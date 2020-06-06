import BootstrapButton from 'react-bootstrap/Button';
import BootstrapJumbotron from 'react-bootstrap/Jumbotron';
import styled from 'styled-components';
import colors from 'styles/colors';
import devices from 'styles/devices';

const Button = styled(BootstrapButton)`
  margin: 30px auto 0 auto;
  width: 300px;
  display: block;
`;

const Jumbotron = styled(BootstrapJumbotron)`
  @media ${devices.phone} {
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
  }

  @media ${devices.desktop} {
    left: 50%;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Header = styled.h1`

`;

const Logo = styled.img`
  width: 150px;

  @media ${devices.phone} {
    width: 75px;
  }
`;

const GetStarted = styled.div`
  font-size: 18px;
  text-align: center;

  code {
    color: ${colors.blue}
  }
`;

export default {
  Button,
  GetStarted,
  Header,
  Jumbotron,
  Logo
};