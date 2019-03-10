import { Resolvers } from "../../../../src/types/resolvers";
import User from "../../../../src/entities/User";
import {
  SignInMutationArgs,
  SignInResponse
} from "../../../../src/types/graphql";
import createJWT from "../../../../src/utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    SignIn: async (_, args: SignInMutationArgs): Promise<SignInResponse> => {
      const { userEmail, userName, profileImage } = args;
      let token;

      try {
        const existUser = await User.findOne({ userEmail });

        if (!existUser) {
          const newUser = await User.create({
            userEmail,
            userName,
            profileImage: profileImage || undefined
          }).save();
          token = createJWT(newUser.id);
        } else {
          token = createJWT(existUser.id);
        }

        return {
          ok: true,
          error: null,
          token
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
