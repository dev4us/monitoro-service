import { withFilter } from "graphql-yoga";
import { getRepository } from "typeorm";
import User from "../../../../src/entities/User";
import Project from "../../../../src/entities/Project";

const resolvers = {
  Subscription: {
    CreateTagSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("newTag"),
        async (payload, _, { context }) => {
          const user: User = context.currentUser;

          const {
            CreateTagSubscription: { projectId }
          } = payload;

          try {
            const project = await getRepository(Project)
              .createQueryBuilder("project")
              .innerJoinAndSelect(
                "project.participants",
                "participants",
                "participants.id = :userId",
                { userId: user.id }
              )
              .where({ id: projectId })
              .getOne();

            if (project) {
              return project.id === projectId;
            } else {
              return false;
            }
          } catch (error) {
            return false;
          }
        }
      )
    }
  }
};

export default resolvers;
