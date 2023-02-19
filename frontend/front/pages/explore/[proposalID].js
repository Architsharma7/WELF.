import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAO_CONTRACT_ABI,
  DAO_CONTRACT_ADDRESS,
} from "../../constants/constants";
import { ethers } from "ethers";

const SpecificProposal = () => {
  const [proposalID, setProposalID] = useState();
  const [proposalData, setProposalData] = useState();
  const router = useRouter();

  // console.log(proposalID);

  const { address, isConnected } = useAccount();
  const provider = useProvider();

  const DAO_Contract = useContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: DAO_CONTRACT_ABI,
    signerOrProvider: provider,
  });

  const fetchProposal = async (proposalId) => {
    try {
      /// Then fetch specific Data for the same
      const data = await DAO_Contract.proposals(proposalId);
      // console.log(data);
      const proposalData = await (await fetch(data._infoCID)).json();
      // console.log(proposalData);
      const finalData = {
        proposalID: proposalId,
        title: proposalData.title,
        description: proposalData.desc,
        image: proposalData.imageCID,
        video: proposalData.videoCID,
        breakage: proposalData.donationbreakage,
        amount: proposalData.donation,
        duration: parseInt(data.duration),
        startTime: parseInt(data.startTime),
        fundContract: data.fundContract,
        creator: data.creator,
        verified: data.verified,
        status: data.status,
      };
      // console.log(finalData);
      setProposalData(finalData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const id = router.query.proposalID;
    if (id) {
      setProposalID(id);
      fetchProposal(id);
    }
  }, [router.query.proposalID]);
  return (
    <div className="w-screen flex h-screen">
      <div className="mx-auto flex justify-center align-middle">
        <p className="text-black text-8xl">{proposalID} proposal id</p>
      </div>
    </div>
  );
};

export default SpecificProposal;
