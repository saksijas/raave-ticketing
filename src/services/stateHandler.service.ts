import { Logger } from "../models/logger";
import { State } from "../models/stateHandler";

export const getState = async (domain: string, blockNumber: Number ) => {
  try{
    const state = await State.findOne({
        where: {
          ensDomain: domain
        }
    });
    if(state == null || state == undefined){
        await State.create({
            ensDomain: domain,
            lastChecked: blockNumber
        })
    }
    return state;
  } catch(err){
    Logger.create({err})
    return err;
  }
}

export const updateState = async(blockNumber: number) =>{
  const state = await State.findOne({
    where: {
      ensDomain: "raave.lens"
    }
  });
  if(state == null || state == undefined){
    await State.create({
        lastChecked: blockNumber
    })
  }
  else {
    state.lastChecked = blockNumber;
    await state.save();
  }
  return state;
}
