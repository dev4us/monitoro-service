import { Resolvers } from "../../../../src/types/resolvers";
import privateResolver from "../../../../src/utils/privateResolvers";
import {
  GetTagsQueryArgs,
  GetTagsResponse
} from "../../../../src/types/graphql";
import { getRepository } from "typeorm";
import Project from "../../../../src/entities/Project";
import Tag from "../../../../src/entities/Tag";

const resolvers: Resolvers = {
  Query: {
    GetTags: privateResolver(
      async (_, args: GetTagsQueryArgs, { req }): Promise<GetTagsResponse> => {
        const { user } = req;
        const { projectId } = args;

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
      }
    )
  }
};

export default resolvers;
