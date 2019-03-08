import { Resolvers } from "../../../../src/types/resolvers";
import { getRepository } from "typeorm";
import privateResolver from "../../../../src/utils/privateResolvers";
import Project from "../../../../src/entities/Project";

const resolvers: Resolvers = {
  Query: {
    GetProjects: privateResolver(async (_, __, { req }) => {
      const { user } = req;

      const projects: Project[] = await getRepository(Project)
        .createQueryBuilder("project")
        .innerJoinAndSelect(
          "project.participants",
          "participants",
          "participants.id = :userId",
          { userId: user.id }
        )
        .getMany();

      return {
        ok: true,
        error: null,
        projects
      };
    })
  }
};

export default resolvers;
