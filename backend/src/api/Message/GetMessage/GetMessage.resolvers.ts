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
        const { projectId, MessageId } = args;
        const { user } = req;
        let msgCount = 0;

        try {
          const message = await getRepository(Message)
            .createQueryBuilder("message")
            .innerJoinAndSelect("message.project", "project")
            .innerJoinAndSelect("project.participants", "user")
            .innerJoinAndSelect("message.tags", "tags")
            .where("message.id = :msgId", { msgId: MessageId })
            .andWhere("user.id = :userId", { userId: user.id })
            .andWhere("project.id = :projectId", { projectId })
            .getOne();

          if (!message) {
            return {
              ok: false,
              error: "Can't Found Message's Data",
              message: null,
              msgCount
            };
          }

          if (message.tags.length !== 0) {
            /*const msgCountQuery = await getRepository(Message)
              .createQueryBuilder("message")
              .innerJoinAndSelect("message.project", "project")
              .innerJoinAndSelect("project.participants", "user")
              .innerJoinAndSelect("message.tags", "tags")
              .addSelect("COUNT(message.id)", "cnt")
              .where("user.id = :userId", { userId: user.id })
              .andWhere("project.id = :projectId", {
                projectId: message.projectId
              })
              .andWhere("tags = :tags", { tags: message.tags })
              .getCount();*/

            msgCount = await getRepository(Message)
              .createQueryBuilder("message")
              .select("DISTINCT(`id`)")
              .leftJoin("message.tags", "tags")
              .where("message.projectId = :projectId", { projectId })
              .andWhere("message.contents = :contents", {
                contents: message.contents
              })
              //.andWhere("message.tags = :tags", { tags: message.tags })
              //.andWhere({})
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
