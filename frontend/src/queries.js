import gql from "graphql-tag";

// Query
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

// Mutation
export const CREATE_NEW_PROJECT = gql`
  mutation createNewProject($projectName: String!) {
    CreateProject(projectName: $projectName) {
      ok
      error
    }
  }
`;
