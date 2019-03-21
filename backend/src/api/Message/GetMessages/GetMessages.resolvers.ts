import { Resolvers } from "../../../types/resolvers";
import privateResolvers from "../../../utils/privateResolvers";
import {
  GetMessagesQueryArgs,
  GetMessagesResponse
} from "../../../types/graphql";
import Project from "../../../entities/Project";
import Message from "../../../entities/Message";
import { getRepository } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    GetMessages: privateResolvers(
      async (
        _,
        args: GetMessagesQueryArgs,
        { req }
      ): Promise<GetMessagesResponse> => {
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
          .where({ projectId })
          .getOne();

        if (!project) {
          return {
            ok: false,
            error: "You are Not Invited this Project",
            messages: null
          };
        }

        const messages = await getRepository(Message)
          .createQueryBuilder("message")
          .leftJoinAndSelect(
            "message.tags",
            "tags",
            "tags.projectId = :projectId",
            { projectId }
          )
          .where({ projectId })
          .orderBy("message.createdAt", "DESC")
          .getMany();

        return {
          ok: true,
          error: null,
          messages: messages
        };
      }
    )
  }
};

export default resolvers;
