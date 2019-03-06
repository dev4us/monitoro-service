export const typeDefs = ["type Message {\n  id: Int!\n  level: String\n  contents: String!\n  fileName: String\n  project: Project\n  tags: [Tag]\n  createdAt: String!\n}\n\ntype CreateProjectResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  CreateProject(projectName: String!): CreateProjectResponse!\n  SignIn(userEmail: String!, userName: String!): SignInResponse!\n}\n\ntype GetProjectsResponse {\n  ok: Boolean!\n  error: String\n  projects: [Project]\n}\n\ntype Query {\n  GetProjects: GetProjectsResponse!\n  User: String!\n}\n\ntype Project {\n  id: Int!\n  name: String!\n  participants: [User]!\n  admin: User\n  messages: [Message]\n  tags: [Tag]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Tag {\n  id: Int!\n  name: String!\n  messages: [Message]!\n  color: String\n  projects: Project\n  createdAt: String!\n  updatedAt: String\n}\n\ntype User {\n  id: Int!\n  userName: String!\n  userMail: String!\n  innerProjects: [Project]\n  manages: [Project]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype SignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetProjects: GetProjectsResponse;
  User: string;
}

export interface GetProjectsResponse {
  ok: boolean;
  error: string | null;
  projects: Array<Project> | null;
}

export interface Project {
  id: number;
  name: string;
  participants: Array<User>;
  admin: User | null;
  messages: Array<Message> | null;
  tags: Array<Tag> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  userName: string;
  userMail: string;
  innerProjects: Array<Project> | null;
  manages: Array<Project> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: number;
  level: string | null;
  contents: string;
  fileName: string | null;
  project: Project | null;
  tags: Array<Tag> | null;
  createdAt: string;
}

export interface Tag {
  id: number;
  name: string;
  messages: Array<Message>;
  color: string | null;
  projects: Project | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Mutation {
  CreateProject: CreateProjectResponse;
  SignIn: SignInResponse;
}

export interface CreateProjectMutationArgs {
  projectName: string;
}

export interface SignInMutationArgs {
  userEmail: string;
  userName: string;
}

export interface CreateProjectResponse {
  ok: boolean;
  error: string | null;
}

export interface SignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}
