import { getRepository } from "typeorm";
import { Resolvers } from "../../../../src/types/resolvers";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import {
  SendMessageMutationArgs,
  SendMessageResponse
} from "../../../../src/types/graphql";

import Project from "../../../../src/entities/Project";
import Tag from "../../../../src/entities/Tag";
import Message from "../../../../src/entities/Message";

const resolvers: Resolvers = {
  Mutation: {
    SendMessage: async (
      _,
      args: SendMessageMutationArgs,
      __
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

        const newMessage = await Message.create({
          ...notNull,
          project
        }).save();

        if (tags) {
          // exist check for tags
          Promise.all(
            tags.map(async attachTags => {
              const existTag = await getRepository(Tag)
                .createQueryBuilder("tag")
                .innerJoinAndSelect(
                  "tag.project",
                  "project",
                  "project.id = :projectId",
                  { projectId: project.id }
                )
                .where({ name: attachTags.attachTag })
                .getOne();

              if (existTag === undefined || !existTag) {
                console.log("newMessage => ", newMessage);

                const newTag = await Tag.create({
                  name: attachTags.attachTag,
                  messages: [newMessage],
                  project
                }).save();

                newMessage.tags.push(newTag);
              } else {
                newMessage.tags.push(existTag);
              }
            })
          );
        }
        newMessage.save();

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
