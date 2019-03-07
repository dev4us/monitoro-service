import React, { useContext } from "react";
import { Store } from "../../GlobalState/store";

import { useMutation } from "react-apollo-hooks";
import { GoogleLogin } from "react-google-login";

import { SIGN_IN_GOOGLE } from "../../queries";

import styled from "styled-components";

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

const Home = () => {
  const { dispatch } = useContext(Store);
  const signInMutation = useMutation(SIGN_IN_GOOGLE);

  return (
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
    </Container>
  );
};
export default Home;
