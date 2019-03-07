import React from "react";
import styled from "styled-components";
import { GoogleLogin } from "react-google-login";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const MiddleFrame = styled.div`
  display: flex;
  width: 350px;
  height: 400px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainLogo = styled.img`
  height: 300px;
`;

const GoogleLoginButton = styled.button`
  width: 191px;
  height: 46px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  background: url(${props => props.normalBg});

  &:hover {
    background: url(${props => props.hoverBg});
  }
`;

const Home = () => (
  <Container>
    <MiddleFrame>
      <MainLogo src={require("../../Assets/images/monitoro_logo.jpg")} />
      <GoogleLogin
        clientId="640441314268-7dthvqpin5rrb6kithpurt4kf9mrd9fq.apps.googleusercontent.com"
        render={renderProps => (
          <GoogleLoginButton
            onClick={renderProps.onClick}
            normalBg={require("../../Assets/images/googleSignIn.png")}
            hoverBg={require("../../Assets/images/googleSignIn_hover.png")}
          />
        )}
        buttonText="Login"
        onSuccess={() => console.log("success")}
        onFailure={() => console.log("fail")}
      />
    </MiddleFrame>
  </Container>
);
export default Home;
