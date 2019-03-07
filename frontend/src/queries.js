import gql from "graphql-tag";

export const SIGN_IN_GOOGLE = gql`
  mutation signInGoogle($userName: String!, $userEmail: String!) {
    SignIn(userName: $userName, userEmail: $userEmail) {
      ok
      error
      token
    }
  }
`;
