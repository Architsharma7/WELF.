import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  FUNDMANAGER_CONTRACT_ABI,
  FUNDMANAGER_CONTRACT_ADDRESS,
  DAO_CONTRACT_ABI,
  DAO_CONTRACT_ADDRESS,
} from "../../constants/constants";
import { ethers } from "ethers";

const SpecificCampaign = () => {
  const [campaignID, setCampaignID] = useState();
  const [campaignData, setCampaignData] = useState();
  const router = useRouter();

  const { address, isConnected } = useAccount();
  const provider = useProvider();

  const FUNDMANAGER_Contract = useContract({
    address: FUNDMANAGER_CONTRACT_ADDRESS,
    abi: FUNDMANAGER_CONTRACT_ABI,
    signerOrProvider: provider,
  });

  const DAO_Contract = useContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: DAO_CONTRACT_ABI,
    signerOrProvider: provider,
  });

  const fetchCampaign = async (campaignID) => {
    try {
      /// Then fetch specific Data for the same
      const data = await FUNDMANAGER_Contract.getCampaignData(campaignID);
      // console.log(data);
      const proposalData = await (await fetch(data._infoCID)).json();
      // console.log(proposalData);

      // User Data
      const userData = await getUserData(data.Creator);
      // console.log(userData);

      const finalData = {
        campaignID: campaignID,
        proposalID: parseInt(data.proposalID),
        title: proposalData.title,
        description: proposalData.desc,
        image: proposalData.imageCID,
        video: proposalData.videoCID,
        breakage: proposalData.donationbreakage,
        amount: proposalData.donation,
        duration: parseInt(data.duration),
        startTime: parseInt(data.startTime),
        fundContract: data.fundContract,
        creatorAddress: data.Creator,
        creatorData: userData,
        totalFunds: parseInt(data.totalFunds),
        totalReq: parseInt(data.totalRequested),
        totalDonors: parseInt(data.totalDonors),
      };
      // console.log(finalData);
      setCampaignData(finalData);
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
    const id = router.query.campaignID;
    if (id) {
      setCampaignID(id);
      fetchCampaign(id);
    }
  }, [router.query.campaignID]);
  return (
    <div className="w-screen flex h-screen">
      <div className="mx-auto flex justify-center align-middle">
        <p className="text-black text-8xl">{campaignID} Campaign id</p>
      </div>
    </div>
  );
};

export default SpecificCampaign;
