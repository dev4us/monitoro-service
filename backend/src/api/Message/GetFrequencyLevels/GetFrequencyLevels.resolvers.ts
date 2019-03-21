import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";
import {
  GetFrequencyLevelsResponse,
  GetFrequencyLevelsQueryArgs
} from "../../../types/graphql";
import Message from "../../../entities/Message";
import Project from "../../../entities/Project";

import { getRepository } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    GetFrequencyLevels: privateResolver(
      async (
        _,
        args: GetFrequencyLevelsQueryArgs,
        { req }
      ): Promise<GetFrequencyLevelsResponse> => {
        const { user } = req;
        const { projectId } = args;

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
              frequencyLevels: null
            };
          }

          const frequencyLevels = await getRepository(Message).query(
            `
            SELECT 
              SUM(CASE WHEN level = 'NOTICE' THEN 1 ELSE 0 END) as notice,
              SUM(CASE WHEN level = 'DEBUG' THEN 1 ELSE 0 END) as debug,
              SUM(CASE WHEN level = 'WARNING' THEN 1 ELSE 0 END) as warning,
              SUM(CASE WHEN level = 'DANGER' THEN 1 ELSE 0 END) as danger,
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
            frequencyLevels
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            frequencyLevels: null
          };
        }
      }
    )
  }
};

export default resolvers;
