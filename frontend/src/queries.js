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

export const PARTICIPATE_PROJECTS_QUERY = gql`
  query {
    GetProjects {
      ok
      error
      projects {
        id
        name
      }
    }
  }
`;
