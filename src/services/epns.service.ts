const EpnsSDK = require("@epnsproject/backend-sdk").default;
const ethers = require('ethers');
import LensHubAbi from "../abis/LensHub.json";
import { Logger } from "../models/logger";
import { readMetadata } from "./ipfs";
import { getState, updateState } from "./stateHandler.service";
const DEFAULT_NETWORK_SETTINGS = {};
const DEFAULT_NOTIFICATION_CHAIN = '137';
const DEFAULT_NETWORK_TO_MONITOR = '137';
let LAST_CHECKED_BLOCK = 30300001;

export const updateLastBlock = async () =>{
  const res = await updateState(LAST_CHECKED_BLOCK);
}
export const raaveNotification = async () =>{
  try{
      // Define the parameters we would need in order to initialize the SDK
      const CHANNEL_PK = process.env.CHANNEL_PK; // the private key of the channel
      // Initialise the SDK
      const  epnsSdk = new EpnsSDK(CHANNEL_PK,{
          communicatorContractAddress: '0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa',
          channelAddress: '0x53EC02E1c9A7fb9b8Bf1ab050Ea1e9a1E16e8745',
          networkKeys: DEFAULT_NETWORK_SETTINGS,
          notificationChainId: DEFAULT_NOTIFICATION_CHAIN,
          networkToMonitor: DEFAULT_NETWORK_TO_MONITOR,
        }
      );

      // get the subscribers to your channel
      const  subscribers = await  epnsSdk.getSubscribedUsers();
      const lensHub = await epnsSdk.getContract('0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d', LensHubAbi);
      const filter = await lensHub.contract.filters.PostCreated();
      const toBlock = await lensHub.provider.getBlockNumber();
      const state = await getState("raave.lens", toBlock);
      LAST_CHECKED_BLOCK = state.lastChecked;
      const events = await lensHub.contract.queryFilter(filter, LAST_CHECKED_BLOCK, toBlock);
      const filteredEvents = events.filter((event: { args: any; }) => {
        return ethers.utils.formatUnits(event.args.profileId,0) === "4"
      })
      console.log(filteredEvents.length);
      for (const evt of filteredEvents){
        const metadata = await readMetadata(evt.args.contentURI);
        let body = metadata.content;
        let type = "1";
        let title = "just posted";
        let amsg = metadata.content;
        let subject = metadata.content;
        let img = "https://pbs.twimg.com/profile_images/1541910462442389505/3Of0pIC8_400x400.jpg";
        let cta = "https://lenster.xyz/u/letsraave.lens";
        // send a notification to your subscribers
          const response = await epnsSdk.sendNotification(
            "0x53EC02E1c9A7fb9b8Bf1ab050Ea1e9a1E16e8745", //the recipients of the notification
            title, // push notification title
            body, //push notification body
            title, //the title of the notification
            subject, //the body of the notification
            type, //1 - for broadcast, 3 - for direct message, 4 - for subset.
            cta, //the CTA of the notification, the link which should be redirected to when they click on the notification
            img,
            amsg
          );
    }
      LAST_CHECKED_BLOCK = toBlock;
      updateLastBlock();
  } catch(err){
    Logger.create({err})
  }
}
