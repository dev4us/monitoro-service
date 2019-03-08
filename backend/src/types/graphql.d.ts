export const typeDefs = ["type GetMessagesResponse {\n  ok: Boolean!\n  error: String\n  messages: [Message]\n}\n\ntype Query {\n  GetMessages(apiKey: String!): GetMessagesResponse!\n  GetProjects: GetProjectsResponse!\n  GetTags(projectId: Int!): GetTagsResponse!\n  User: String!\n}\n\ntype SendMessageResponse {\n  ok: Boolean!\n  error: String\n}\n\ninput attachTags {\n  attachTag: String!\n}\n\ntype Mutation {\n  SendMessage(level: String!, contents: String!, fileName: String, apiKey: String!, tags: [attachTags]): SendMessageResponse!\n  CreateProject(projectName: String!): CreateProjectResponse!\n  CreateTag(projectId: Int!, name: String!, color: String): CreateTagResponse!\n  SignIn(userEmail: String!, userName: String!): SignInResponse!\n}\n\ntype Subscription {\n  SendMessageSubscription: Message\n  CreateTagSubscription: Tag\n}\n\ntype Message {\n  id: Int!\n  level: String\n  contents: String!\n  fileName: String\n  project: Project\n  projectId: Int\n  tags: [Tag]\n  createdAt: String!\n}\n\ntype CreateProjectResponse {\n  ok: Boolean!\n  error: String\n  project: Project\n}\n\ntype GetProjectsResponse {\n  ok: Boolean!\n  error: String\n  projects: [Project]\n}\n\ntype Project {\n  id: Int!\n  name: String!\n  participants: [User]!\n  admin: User\n  messages: [Message]\n  tags: [Tag]\n  apiKey: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateTagResponse {\n  ok: Boolean!\n  error: String\n  tag: Tag\n}\n\ntype GetTagsResponse {\n  ok: Boolean!\n  error: String\n  tags: [Tag]\n}\n\ntype Tag {\n  id: Int!\n  name: String!\n  color: String\n  project: Project!\n  projectId: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype User {\n  id: Int!\n  userName: String!\n  userEmail: String!\n  innerProjects: [Project]\n  manages: [Project]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype SignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetMessages: GetMessagesResponse;
  GetProjects: GetProjectsResponse;
  GetTags: GetTagsResponse;
  User: string;
}

export interface GetMessagesQueryArgs {
  apiKey: string;
}

export interface GetTagsQueryArgs {
  projectId: number;
}

export interface GetMessagesResponse {
  ok: boolean;
  error: string | null;
  messages: Array<Message> | null;
}

export interface Message {
  id: number;
  level: string | null;
  contents: string;
  fileName: string | null;
  project: Project | null;
  projectId: number | null;
  tags: Array<Tag> | null;
  createdAt: string;
}

export interface Project {
  id: number;
  name: string;
  participants: Array<User>;
  admin: User | null;
  messages: Array<Message> | null;
  tags: Array<Tag> | null;
  apiKey: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  userName: string;
  userEmail: string;
  innerProjects: Array<Project> | null;
  manages: Array<Project> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Tag {
  id: number;
  name: string;
  color: string | null;
  project: Project;
  projectId: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetProjectsResponse {
  ok: boolean;
  error: string | null;
  projects: Array<Project> | null;
}

export interface GetTagsResponse {
  ok: boolean;
  error: string | null;
  tags: Array<Tag> | null;
}

export interface Mutation {
  SendMessage: SendMessageResponse;
  CreateProject: CreateProjectResponse;
  CreateTag: CreateTagResponse;
  SignIn: SignInResponse;
}

export interface SendMessageMutationArgs {
  level: string;
  contents: string;
  fileName: string | null;
  apiKey: string;
  tags: Array<attachTags> | null;
}

export interface CreateProjectMutationArgs {
  projectName: string;
}

export interface CreateTagMutationArgs {
  projectId: number;
  name: string;
  color: string | null;
}

export interface SignInMutationArgs {
  userEmail: string;
  userName: string;
}

export interface attachTags {
  attachTag: string;
}

export interface SendMessageResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateProjectResponse {
  ok: boolean;
  error: string | null;
  project: Project | null;
}

export interface CreateTagResponse {
  ok: boolean;
  error: string | null;
  tag: Tag | null;
}

export interface SignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface Subscription {
  SendMessageSubscription: Message | null;
  CreateTagSubscription: Tag | null;
}
