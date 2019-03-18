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
        let similarMsg;

        try {
          const message = await getRepository(Message)
            .createQueryBuilder("message")
            .innerJoinAndSelect("message.project", "project")
            .innerJoinAndSelect("project.participants", "user")
            .leftJoinAndSelect("message.tags", "tags")
            .where("message.id = :msgId", { msgId: messageId })
            .andWhere("user.id = :userId", { userId: user.id })
            .andWhere("project.id = :projectId", { projectId })
            .getOne();

          if (!message) {
            return {
              ok: false,
              error: "Can't Found Message's Data",
              message: null,
              msgCount,
              similarMsg: null
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

            similarMsg = await getRepository(Message)
              .createQueryBuilder("message")
              .leftJoin("message.tags", "tags")
              .where("message.projectId = :projectId", { projectId })
              .andWhere("tags.projectId = :projectId", { projectId })
              .andWhere("message.contents = :contents", {
                contents: message.contents
              })
              .orderBy("message.createdAt", "DESC")
              .getMany();
          }

          return {
            ok: true,
            error: null,
            message,
            msgCount,
            similarMsg: similarMsg || null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            message: null,
            msgCount: 0,
            similarMsg: null
          };
        }
      }
    )
  }
};

export default resolvers;
