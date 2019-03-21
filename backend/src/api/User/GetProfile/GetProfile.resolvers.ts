import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";
import { GetProfileResponse } from "../../../types/graphql";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    GetProfile: privateResolver(
      async (_, __, { req }): Promise<GetProfileResponse> => {
        const { user } = req;

        try {
          const existUser = await User.findOne({ id: user.id });

          if (!existUser) {
            return {
              ok: false,
              error: "Not Found User",
              user: null
            };
          }
          return {
            ok: true,
            error: null,
            user: existUser
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            user: null
          };
        }
      }
    )
  }
};

export default resolvers;
