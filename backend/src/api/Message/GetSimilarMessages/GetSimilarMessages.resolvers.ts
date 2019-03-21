import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";
import {
  GetSimilarMessagesQueryArgs,
  GetSimilarMessagesResponse
} from "../../../types/graphql";
import Message from "../../../entities/Message";
import Project from "../../../entities/Project";

import { getRepository } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    GetSimilarMessages: privateResolver(
      async (
        _,
        args: GetSimilarMessagesQueryArgs,
        { req }
      ): Promise<GetSimilarMessagesResponse> => {
        const { user } = req;
        const { projectId, msgId } = args;

        try {
          const accessAble = await getRepository(Project)
            .createQueryBuilder("project")
            .leftJoin("project.participants", "participants")
            .where("participants.id = :user", { user: user.id })
            .andWhere("project.id = :projectId", { projectId })
            .getOne();

          if (!accessAble) {
            return {
              ok: false,
              error: "Not found Project or You Don't have Auth",
              msgCount: null
            };
          }

          const message = await Message.findOne({ id: msgId });

          if (!message) {
            return {
              ok: false,
              error: "Not found Message",
              msgCount: null
            };
          }

          const msgCount = await getRepository(Message).query(
            `SELECT 
            SUM(CASE WHEN (level = '${message.level}' AND contents = '${
              message.contents
            }') THEN 1 ELSE 0 END) as count,
            date("createdAt") as date
          FROM message
          WHERE 
            "createdAt" >= (NOW() - interval '7' Day)
          GROUP BY date("createdAt")
          ORDER BY date("createdAt") ASC;
          `
          );

          return {
            ok: true,
            error: null,
            msgCount
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            msgCount: null
          };
        }
      }
    )
  }
};

export default resolvers;
