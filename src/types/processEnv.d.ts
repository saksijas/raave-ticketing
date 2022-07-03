declare namespace NodeJS {
    interface ProcessEnv {
      readonly PORT: number
      readonly SNAPSHOT_GRAPHQL: string
      readonly DB_URI: string
      readonly ENS_DOMAIN: string
      readonly DYNAMIC_NFT_ADDRESS: string
      readonly DEPLOYER_ADDRESS: string
      readonly DEPLOYER: string
      readonly RPC_PROVIDER: string
    }
  }