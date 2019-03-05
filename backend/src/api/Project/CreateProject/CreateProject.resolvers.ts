import { getRepository } from "typeorm";
import { Resolvers } from "../../../../src/types/resolvers";
import privateResolvers from "../../../utils/privateResolvers";
import {
  CreateProjectResponse,
  CreateProjectMutationArgs
} from "src/types/graphql";
import Project from "../../../../src/entities/Project";
import User from "../../../../src/entities/User";

const resolvers: Resolvers = {
  Mutation: {
    CreateProject: privateResolvers(
      async (
        _,
        args: CreateProjectMutationArgs,
        { req }
      ): Promise<CreateProjectResponse> => {
        const { projectName } = args;
        const { user } = req;

        try {
          const existProject = await getRepository(Project)
            .createQueryBuilder("project")
            .leftJoinAndSelect(User, "user", "user.id = :userId", {
              userId: user.id
            })
            .where("project.name = :projectName", { projectName })
            .getOne();

          if (existProject) {
            return {
              ok: false,
              error: "This project already exists"
            };
          } else {
            await Project.create({
              name: projectName,
              participants: [user]
            }).save();

            return {
              ok: true,
              error: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
