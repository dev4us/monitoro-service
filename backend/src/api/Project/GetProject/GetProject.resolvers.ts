import { getRepository } from "typeorm";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

import Project from "../../../entities/Project";
import {
  GetProjectQueryArgs,
  GetProjectResponse
} from "../../../types/graphql";

const resolvers: Resolvers = {
  Query: {
    GetProject: privateResolver(
      async (
        _,
        args: GetProjectQueryArgs,
        { req }
      ): Promise<GetProjectResponse> => {
        const { projectId } = args;
        const { user } = req;

        const project = await getRepository(Project)
          .createQueryBuilder("project")
          .innerJoinAndSelect(
            "project.participants",
            "participants",
            "participants.id = :userId",
            { userId: user.id }
          )
          .leftJoinAndSelect(
            "project.messages",
            "messages",
            "messages.projectId = :projectId",
            { projectId }
          )
          .leftJoinAndSelect(
            "messages.tags",
            "tags",
            "tags.projectId = :projectId",
            { projectId }
          )
          .where({ id: projectId })
          .getOne();

        if (!project) {
          return {
            ok: false,
            error: "Not found project or Doesn't Have Authority",
            project: null
          };
        }

        return {
          ok: true,
          error: null,
          project
        };
      }
    )
  }
};

export default resolvers;
