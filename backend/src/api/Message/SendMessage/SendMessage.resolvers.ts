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

        if (tags) {
          let afterTag = [{}];

          Promise.all(
            tags.map(async (attachTags, index, array) => {
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

              if (existTag) {
                afterTag.push(existTag);
              } else {
                const newTag = await Tag.create({
                  name: attachTags.attachTag,
                  project
                }).save();

                afterTag.push(newTag);
              }

              if (index === array.length - 1) {
                await Message.create({
                  ...notNull,
                  tags: afterTag,
                  project
                }).save();
              }
            })
          );
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
