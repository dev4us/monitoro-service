import { getRepository } from "typeorm";
import { Resolvers } from "../../../types/resolvers";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import {
  SendMessageMutationArgs,
  SendMessageResponse
} from "../../../types/graphql";

import Project from "../../../entities/Project";
import Tag from "../../../entities/Tag";
import Message from "../../../entities/Message";

const resolvers: Resolvers = {
  Mutation: {
    SendMessage: async (
      _,
      args: SendMessageMutationArgs,
      { pubSub }
    ): Promise<SendMessageResponse> => {
      const notNull = cleanNullArgs(args);
      const { apiKey, tags } = args;

      try {
        //exist Project check
        const project = await Project.findOne({ apiKey });

        if (!project) {
          return {
            ok: false,
            error: "Can't find Project, Please Check Out this"
          };
        }

        if (tags) {
          const promiseMap = tags.map(async (attachTags, index, array) => {
            const existTag = await getRepository(Tag)
              .createQueryBuilder("tag")
              .innerJoinAndSelect(
                "tag.project",
                "project",
                "project.id = :projectId",
                { projectId: project.id }
              )
              .where({ name: attachTags.name })
              .getOne();

            if (existTag) {
              return existTag;
            } else {
              const newTag = await Tag.create({
                name: attachTags.name,
                color: attachTags.color || undefined,
                project
              }).save();
              return newTag;
            }
          });

          const getNewTags = await Promise.all(promiseMap);

          const newMessage = await Message.create({
            ...notNull,
            tags: getNewTags,
            project
          }).save();

          pubSub.publish("newMessage", {
            SendMessageSubscription: newMessage
          });
        } else {
          const newMessage = await Message.create({
            ...notNull,
            project
          }).save();

          pubSub.publish("newMessage", {
            SendMessageSubscription: newMessage
          });
        }

        return {
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }
  }
};

export default resolvers;
