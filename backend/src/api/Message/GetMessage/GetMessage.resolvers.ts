import { Resolvers } from "../../../../src/types/resolvers";
import privateResolver from "../../../../src/utils/privateResolvers";
import {
  GetMessageQueryArgs,
  GetMessageResponse
} from "../../../../src/types/graphql";
import Message from "../../../../src/entities/Message";
import { getRepository } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    GetMessage: privateResolver(
      async (
        _,
        args: GetMessageQueryArgs,
        { req }
      ): Promise<GetMessageResponse> => {
        const { projectId, messageId } = args;
        const { user } = req;
        let msgCount = 0;

        try {
          const message = await getRepository(Message)
            .createQueryBuilder("message")
            .innerJoinAndSelect("message.project", "project")
            .innerJoinAndSelect("project.participants", "user")
            .innerJoinAndSelect("message.tags", "tags")
            .where("message.id = :msgId", { msgId: messageId })
            .andWhere("user.id = :userId", { userId: user.id })
            .andWhere("project.id = :projectId", { projectId })
            .getOne();
          console.log(message);
          if (!message) {
            return {
              ok: false,
              error: "Can't Found Message's Data",
              message: null,
              msgCount
            };
          }

          if (message.tags.length !== 0) {
            msgCount = await getRepository(Message)
              .createQueryBuilder("message")
              .leftJoin("message.tags", "tags")
              .where("message.projectId = :projectId", { projectId })
              .andWhere("tags.projectId = :projectId", { projectId })
              .andWhere("message.contents = :contents", {
                contents: message.contents
              })
              .getCount();
          }

          return {
            ok: true,
            error: null,
            message,
            msgCount
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            message: null,
            msgCount
          };
        }
      }
    )
  }
};

export default resolvers;
