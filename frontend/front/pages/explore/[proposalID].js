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
      console.log(parseInt(data.amountReq));
      const proposalData = await (await fetch(data._infoCID)).json();
      // console.log(proposalData);

      // User Data
      const userData = await getUserData(data.creator);
      // console.log(userData);

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
        creatorAddress: data.creator,
        creatorData: userData,
        verified: data.verified,
        status: data.status,
      };
      // console.log(finalData);
      setProposalData(finalData);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async (creatorAddress) => {
    try {
      const data = await DAO_Contract.getMemberData(creatorAddress);
      // console.log(data);
      const ipfsData = await (await fetch(data.profileCID)).json();
      // console.log(ipfsData);
      const memberData = {
        name: ipfsData.name,
        bio: ipfsData.bio,
        pfp: ipfsData.pfp,
        country: ipfsData.country,
        tokenID: parseInt(data.NFTTokenID),
        verified: data.verified,
        status: data.status,
      };
      return memberData;
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
