import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolvers";
import { GetFrequencyLevelsResponse, GetFrequencyLevelsqueryArgs } from "src/types/graphql";
import Message from "src/entities/Message";
import { getRepository } from "typeorm";
import Project from "src/entities/Project";

const resolvers:Resolvers = {
  Query:{
    GetFrequencyLevels:privateResolver(
      async (_, args:GetFrequencyLevelsqueryArgs, {req}):Promise<GetFrequencyLevelsResponse> => {
        const {user} = req;
        const {projectId} = args;

        try{
          const accessAble = await Project.findOne({participants: user, id:projectId});

          if(!accessAble){
            return{
              ok:false,
              error: "Not found Project or You Don't have Auth",
              frequency:null
            }
          }

          const notice = await Message.count({projectId, level: "NOTICE"});
          const debug = await Message.count({projectId, level: "DEBUG"});
          const warning = await Message.count({projectId, level: "WARNING"});
          const danger = await Message.count({projectId, level: "DANGER"});

          return{
            ok:true,
            error:null,
            frequency: {
              notice,
              debug,
              warning,
              danger
            }
          }
        }catch(error){
          return{
            ok: false,
            error: error.message,
            frequency:null
          }
        }
        
        
        const NoticeCount = await getRepository(Message).createQueryBuilder('message').
        const DebugCount = 
        const WarningCount = 
        const DangerCount = 
      }
    )
  }
}

export default resolvers;