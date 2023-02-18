import React from 'react'
import { makeStorageClient } from "../../functions/ipfsstorage";

const Proposals = ({proposalvalue}) => {
  return (
    <div>
        <h1></h1>
    </div>
  )
}

// async function listUploads () {
//     const client = makeStorageClient()
//     for await (const upload of client.list()) {
//       return upload.cid;
//     }
// }
// var hell = listUploads();
// console.log(hell)
  
// export async function getStaticProps({params}){
//     const results = await fetch(`https://${cid}.ipfs.w3s.link/`).then((r) => r.json);
//     return {
//         props: {
//             proposalIn : results[0],
//         }
//     }
// }  

// export async function getStaticPaths(){
//       const proposalin = fetch("");
//       return{
//         paths:proposalin.map((proposalvalue)=> {
//           return{
//             params:{
//               proposalcid: propasalID,
//             }
//           }
//         })
//       }
// }

// console.log(`${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`)

export default Proposals;