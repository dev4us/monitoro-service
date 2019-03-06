import { Resolvers } from "../../../../src/types/resolvers";
import { getRepository } from "typeorm";
import privateResolver from "../../../../src/utils/privateResolvers";
import Project from "../../../../src/entities/Project";
//import User from "../../../../src/entities/User";

const resolvers: Resolvers = {
  Query: {
    GetProjects: privateResolver(async (_, __, { req }) => {
      const { user } = req;

      const projects: Project[] = await getRepository(Project)
        .createQueryBuilder("project")
        .innerJoinAndSelect(
          "project.participants",
          "participants",
          "participants.userName = :userName",
          { userName: user.userName }
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
