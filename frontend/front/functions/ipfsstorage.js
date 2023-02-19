import { Web3Storage } from "web3.storage";

const WEB3STORAGE_TOKEN = process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;

function getAccessToken() {
  return WEB3STORAGE_TOKEN;
}

export function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export const storeProposal = async (obj) => {
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  const files = [new File([blob], "proposal.json")];
  console.log("Uploading the Contract data to IPFS via web3.storage");
  const client = makeStorageClient();
  const cid = await client.put(files, {
    wrapWithDirectory: false,
  });
  console.log("stored files with cid:", cid);
  return cid;
};

// export async function retrieveFiles (cid) {
//   const client = makeStorageClient()
//   const res = await client.get(cid)
//   console.log(`Got a response! [${res.status}] ${res.statusText}`)
//   if (!res.ok) {
//     throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
//   }
//   // unpack File objects from the response
//   const files = await res.files()
//   for (const file of files) {
//     console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
//   }
// }

export const StoreContent = async (files) => {
  console.log("Uploading files to IPFS with web3.storage....");
  const client = makeStorageClient();
  const cid = await client.put([files], {
    wrapWithDirectory: false,
  });
  console.log("Stored files with cid:", cid);
  return cid;
};
