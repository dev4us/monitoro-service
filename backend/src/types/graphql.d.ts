export const typeDefs = ["type GetMessageResponse {\n  ok: Boolean!\n  error: String\n  message: Message\n  msgCount: Int!\n}\n\ntype Query {\n  GetMessage(projectId: Int!, messageId: Int!): GetMessageResponse!\n  GetMessages(projectId: Int!): GetMessagesResponse!\n  GetProject(projectId: Int!): GetProjectResponse!\n  GetProjects: GetProjectsResponse!\n  GetTags(projectId: Int!): GetTagsResponse!\n  GetProfile: GetProfileResponse!\n  User: String!\n}\n\ntype GetMessagesResponse {\n  ok: Boolean!\n  error: String\n  messages: [Message]\n}\n\ntype SendMessageResponse {\n  ok: Boolean!\n  error: String\n}\n\ninput attachTags {\n  name: String!\n  color: String\n}\n\nenum levelOption {\n  NOTICE\n  WARNING\n  DEBUG\n  DANGER\n}\n\ntype Mutation {\n  SendMessage(level: levelOption!, contents: String!, location: String, apiKey: String!, tags: [attachTags]): SendMessageResponse!\n  CreateProject(projectName: String!, description: String, thumbnail: String): CreateProjectResponse!\n  CreateTag(projectId: Int!, name: String!, color: String): CreateTagResponse!\n  SignIn(userEmail: String!, userName: String!, profileImage: String): SignInResponse!\n}\n\ntype Subscription {\n  SendMessageSubscription: Message\n  CreateTagSubscription: Tag\n}\n\ntype Message {\n  id: Int!\n  level: String\n  contents: String!\n  location: String\n  project: Project\n  projectId: Int\n  tags: [Tag]\n  createdAt: String!\n}\n\ntype CreateProjectResponse {\n  ok: Boolean!\n  error: String\n  project: Project\n}\n\ntype GetProjectResponse {\n  ok: Boolean!\n  error: String\n  project: Project\n}\n\ntype GetProjectsResponse {\n  ok: Boolean!\n  error: String\n  projects: [Project]\n}\n\ntype Project {\n  id: Int!\n  name: String!\n  thumbnail: String\n  description: String\n  participants: [User]!\n  admin: User\n  messages: [Message]\n  tags: [Tag]\n  apiKey: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateTagResponse {\n  ok: Boolean!\n  error: String\n  tag: Tag\n}\n\ntype GetTagsResponse {\n  ok: Boolean!\n  error: String\n  tags: [Tag]\n}\n\ntype Tag {\n  id: Int!\n  name: String!\n  color: String\n  project: Project!\n  projectId: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype GetProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype User {\n  id: Int!\n  userName: String!\n  userEmail: String!\n  profileImage: String\n  innerProjects: [Project]\n  manages: [Project]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype SignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetMessage: GetMessageResponse;
  GetMessages: GetMessagesResponse;
  GetProject: GetProjectResponse;
  GetProjects: GetProjectsResponse;
  GetTags: GetTagsResponse;
  GetProfile: GetProfileResponse;
  User: string;
}

export interface GetMessageQueryArgs {
  projectId: number;
  messageId: number;
}

export interface GetMessagesQueryArgs {
  projectId: number;
}

export interface GetProjectQueryArgs {
  projectId: number;
}

export interface GetTagsQueryArgs {
  projectId: number;
}

export interface GetMessageResponse {
  ok: boolean;
  error: string | null;
  message: Message | null;
  msgCount: number;
}

export interface Message {
  id: number;
  level: string | null;
  contents: string;
  location: string | null;
  project: Project | null;
  projectId: number | null;
  tags: Array<Tag> | null;
  createdAt: string;
}

export interface Project {
  id: number;
  name: string;
  thumbnail: string | null;
  description: string | null;
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
  profileImage: string | null;
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

export interface GetMessagesResponse {
  ok: boolean;
  error: string | null;
  messages: Array<Message> | null;
}

export interface GetProjectResponse {
  ok: boolean;
  error: string | null;
  project: Project | null;
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

export interface GetProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  SendMessage: SendMessageResponse;
  CreateProject: CreateProjectResponse;
  CreateTag: CreateTagResponse;
  SignIn: SignInResponse;
}

export interface SendMessageMutationArgs {
  level: levelOption;
  contents: string;
  location: string | null;
  apiKey: string;
  tags: Array<attachTags> | null;
}

export interface CreateProjectMutationArgs {
  projectName: string;
  description: string | null;
  thumbnail: string | null;
}

export interface CreateTagMutationArgs {
  projectId: number;
  name: string;
  color: string | null;
}

export interface SignInMutationArgs {
  userEmail: string;
  userName: string;
  profileImage: string | null;
}

export type levelOption = "NOTICE" | "WARNING" | "DEBUG" | "DANGER";

export interface attachTags {
  name: string;
  color: string | null;
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
