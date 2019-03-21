import { getRepository } from "typeorm";
import { Resolvers } from "../../../types/resolvers";
import privateResolvers from "../../../utils/privateResolvers";
import {
  CreateProjectResponse,
  CreateProjectMutationArgs
} from "src/types/graphql";
import Project from "../../../entities/Project";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    CreateProject: privateResolvers(
      async (
        _,
        args: CreateProjectMutationArgs,
        { req }
      ): Promise<CreateProjectResponse> => {
        const { projectName, description, thumbnail } = args;
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
              error: "This project already exists",
              project: null
            };
          } else {
            const newProject = await Project.create({
              name: projectName,
              participants: [user],
              description: description || undefined,
              thumbnail: thumbnail || undefined
            }).save();

            return {
              ok: true,
              error: null,
              project: newProject
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            project: null
          };
        }
      }
    )
  }
};

export default resolvers;
