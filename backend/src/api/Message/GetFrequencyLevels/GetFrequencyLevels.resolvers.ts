import { Resolvers } from "../../../../src/types/resolvers";
import privateResolver from "../../../../src/utils/privateResolvers";
import {
  GetFrequencyLevelsResponse,
  GetFrequencyLevelsQueryArgs
} from "../../../../src/types/graphql";
import Message from "../../../../src/entities/Message";
import Project from "../../../../src/entities/Project";

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
              SUM(CASE WHEN level = 'Notice' THEN 1 ELSE 0 END) as notice,
              SUM(CASE WHEN level = 'Debug' THEN 1 ELSE 0 END) as debug,
              SUM(CASE WHEN level = 'Warning' THEN 1 ELSE 0 END) as warning,
              SUM(CASE WHEN level = 'Danger' THEN 1 ELSE 0 END) as danger,
              date("createdAt") as date
            FROM message
            WHERE 
              "createdAt" >= ("createdAt" - interval '7' Day)
            GROUP BY date("createdAt")
            ORDER BY date("createdAt") DESC;
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
