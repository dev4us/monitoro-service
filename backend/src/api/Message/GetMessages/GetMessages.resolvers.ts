import { Resolvers } from "../../../../src/types/resolvers";
import privateResolvers from "../../../utils/privateResolvers";
import {
  GetMessagesQueryArgs,
  GetMessagesResponse
} from "../../../../src/types/graphql";
import Project from "../../../../src/entities/Project";
import Message from "../../../../src/entities/Message";
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
        const { apiKey } = args;

        const project = await getRepository(Project)
          .createQueryBuilder("project")
          .innerJoinAndSelect(
            "project.participants",
            "participants",
            "participants.id = :userId",
            { userId: user.id }
          )
          .where({ apiKey })
          .getOne();

        if (!project) {
          return {
            ok: false,
            error: "You are Not Invited this Project",
            messages: null
          };
        }

        const messages = await Message.find({
          where: {
            projectId: project.id
          },
          relations: ["tags"]
        });

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
