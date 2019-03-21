import { getRepository } from "typeorm";
import { withFilter } from "graphql-yoga";
import Project from "../../../entities/Project";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    SendMessageSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("newMessage"),
        async (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            SendMessageSubscription: { projectId }
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
              return projectId === project.id;
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
