import { Resolvers } from "../../../../src/types/resolvers";
import privateResolver from "../../../../src/utils/privateResolvers";
import {
  CreateTagMutationArgs,
  CreateTagResponse
} from "../../../../src/types/graphql";
import { getRepository } from "typeorm";

import Project from "../../../../src/entities/Project";
import Tag from "../../../../src/entities/Tag";

const resolvers: Resolvers = {
  Mutation: {
    CreateTag: privateResolver(
      async (
        _,
        args: CreateTagMutationArgs,
        { req, pubSub }
      ): Promise<CreateTagResponse> => {
        const { projectId, name, color } = args;
        const { user } = req;

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

        if (!project) {
          return {
            ok: false,
            error: "You Can't Access this project",
            tag: null
          };
        }

        const existTag = await getRepository(Tag)
          .createQueryBuilder("tag")
          .innerJoinAndSelect(
            "tag.project",
            "project",
            "project.id = :projectId",
            { projectId: project.id }
          )
          .where({ name })
          .getOne();

        if (existTag) {
          return {
            ok: false,
            error: "Already registered Tag, Insert other one",
            tag: null
          };
        } else {
          const newTag = await Tag.create({
            name,
            project,
            color: color || undefined
          }).save();

          pubSub.publish("newTag", {
            CreateTagSubscription: newTag
          });

          return {
            ok: true,
            error: null,
            tag: newTag
          };
        }
      }
    )
  }
};
export default resolvers;
