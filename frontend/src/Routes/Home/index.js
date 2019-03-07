import React, { useContext } from "react";
import { Store } from "../../GlobalState/store";

import { useMutation } from "react-apollo-hooks";
import { GoogleLogin } from "react-google-login";

import { SIGN_IN_GOOGLE } from "../../queries";

import styled from "styled-components";
import GoogleLogoSvg from "../../Assets/images/googleLogo.svg";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const LeftFrame = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 850px) {
    flex: unset;
    flex-direction: column;
    height: 250px;
  }
`;

const RightFrame = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #73c6f3;
`;

const MiddleFrame = styled.div`
  width: 60%;
`;

const IntroText = styled.p`
  font-family: "Roboto";
  font-size: 2.3rem;
  font-weight: bold;
  white-space: nowrap;
  color: white;
  margin-bottom: 25px;
  text-shadow: 1px 1px 2px gray;

  @media (max-width: 850px) {
    font-size: 1.8rem;
    white-space: unset;
  }
`;

const MainLogo = styled.img`
  width: 40%;
  @media (max-width: 850px) {
    width: unset;
    height: 60%;
  }
`;

const GoogleLoginButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 191px;
  height: 46px;
  padding-left: 15px;
  padding-right: 25px;
  background: white;
  border-radius: 5px;
  text-align: left;

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.1725);
  transition: all 0.3s;

  &:hover {
    box-shadow: unset;
    background: #ececec;
  }

  cursor: pointer;
`;

const GoogleLogo = styled.img`
  height: 23px;
`;

const GoogleLogoText = styled.a`
  color: #5c5c5c;
`;

const Home = () => {
  const { dispatch } = useContext(Store);
  const signInMutation = useMutation(SIGN_IN_GOOGLE);

  return (
    <Container>
      <LeftFrame>
        <MainLogo src={require("../../Assets/images/monitoro_logo.jpg")} />
      </LeftFrame>
      <RightFrame>
        <MiddleFrame>
          <IntroText>
            Let's Start with us. <br />
            Please First Login
          </IntroText>

          <GoogleLogin
            clientId="640441314268-7dthvqpin5rrb6kithpurt4kf9mrd9fq.apps.googleusercontent.com"
            render={renderProps => (
              <GoogleLoginButton onClick={renderProps.onClick}>
                <GoogleLogo src={GoogleLogoSvg} />{" "}
                <GoogleLogoText>Sign In With Google</GoogleLogoText>
              </GoogleLoginButton>
            )}
            buttonText="Login"
            onSuccess={responseGoogle => {
              const {
                profileObj: { name, email }
              } = responseGoogle;

              signInMutation({
                variables: { userEmail: email, userName: name }
              }).then(
                result => {
                  const {
                    data: {
                      SignIn: { ok, error, token }
                    }
                  } = result;

                  if (ok === true) {
                    localStorage.setItem("jwt", token);
                    dispatch({ type: "LOGIN", payload: token });
                  } else {
                    alert(error);
                  }
                },
                error => {
                  alert(`Login failed with Google Account`);
                }
              );
            }}
            onFailure={() => {
              alert(`Login failed with Google Account`);
            }}
          />
        </MiddleFrame>
      </RightFrame>
    </Container>
  );
};
export default Home;
