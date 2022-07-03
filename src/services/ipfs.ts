import axios from "axios";
export interface ContentMetadata {
    name: string;
    description: string;
    content: string;
  }
  
  export async function readMetadata(ipfsHash: string) {
    const response = await axios.get(`${ipfsHash}`);
    return response.data as ContentMetadata;
  }
