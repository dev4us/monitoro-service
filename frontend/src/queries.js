import gql from "graphql-tag";

// Query
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

export const GET_TAGS_QUERY = gql`
  query getTags($projectId: Int!) {
    GetTags(projectId: $projectId) {
      tags {
        name
        color
      }
    }
  }
`;

export const GET_USER_RPOFILE_QUERY = gql`
  query {
    GetProfile {
      user {
        id
        userName
        userEmail
        profileImage
      }
    }
  }
`;

// Mutation
export const SIGN_IN_GOOGLE = gql`
  mutation signInGoogle(
    $userName: String!
    $userEmail: String!
    $profileImage: String
  ) {
    SignIn(
      userName: $userName
      userEmail: $userEmail
      profileImage: $profileImage
    ) {
      ok
      error
      token
    }
  }
`;

export const CREATE_NEW_PROJECT = gql`
  mutation createNewProject(
    $projectName: String!
    $description: String
    $thumbnail: String
  ) {
    CreateProject(
      projectName: $projectName
      description: $description
      thumbnail: $thumbnail
    ) {
      ok
      error
      project {
        id
      }
    }
  }
`;

export const CREATE_TAG_MUTATION = gql`
  mutation createTag($projectId: Int!, $name: String!, $color: String) {
    CreateTag(projectId: $projectId, name: $name, color: $color) {
      ok
      error
      tag {
        name
        color
      }
    }
  }
`;
