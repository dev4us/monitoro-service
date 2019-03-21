import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";
import { GetTagsQueryArgs, GetTagsResponse } from "../../../types/graphql";
import { getRepository } from "typeorm";
import Project from "../../../entities/Project";
import Tag from "../../../entities/Tag";

const resolvers: Resolvers = {
  Query: {
    GetTags: privateResolver(
      async (_, args: GetTagsQueryArgs, { req }): Promise<GetTagsResponse> => {
        const { user } = req;
        const { projectId } = args;

        try {
          const project = await getRepository(Project)
            .createQueryBuilder("project")
            .innerJoinAndSelect(
              "project.participants",
              "participants",
              "participants.id = :userId",
              { userId: user.id }
            )
            .where({ id: projectId })
            .getOne();

          if (!project) {
            return {
              ok: false,
              error: "You Can't Access this project",
              tags: null
            };
          }

          const tags = await Tag.find({ projectId });

          return {
            ok: true,
            error: null,
            tags
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            tags: null
          };
        }
      }
    )
  }
};

export default resolvers;
