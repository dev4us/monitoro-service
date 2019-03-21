import { Resolvers } from "../../../types/resolvers";
import { getRepository } from "typeorm";
import privateResolver from "../../../utils/privateResolvers";
import Project from "../../../entities/Project";

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
