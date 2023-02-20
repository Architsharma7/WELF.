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
import { Progress } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

const SpecificCampaign = () => {
  const [campaignID, setCampaignID] = useState();
  const [campaignData, setCampaignData] = useState();
  const router = useRouter();
  const [daomember, setDaoMember] = useState();

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(campaignData.totalReq)

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
      setDaoMember(memberData);
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
    <div className="w-screen">
      <div className="">
        {loading ? (
          <div className="mx-auto flex justify-center mt-20">
            <Spinner size="xl" />
          </div>
        ) : (
          <div className="flex lg:flex-row flex-col">
            {campaignData ? (
              <div className="mx-auto flex lg:flex-row flex-col mt-10">
                <div className="w-4/5 justify-center flex lg:flex-row flex-col mx-auto">
                  <div className="lg:w-4/5 w-full flex flex-col items-center lg:items-start mx-auto lg:mx-6">
                    <p className="text-black text-4xl 4xl:text-7xl text-center">
                      {campaignData.title}
                    </p>
                    <img src={campaignData.image} alt="" className="mt-10" />
                    <video
                      src={campaignData.video}
                      id="my-video"
                      class="video-js"
                      controls
                      preload="auto"
                      width="640"
                      height="264"
                      data-setup="{}"
                      className="mt-5"
                    ></video>
                    {/* <img src={proposalData.image} alt="Problem in fetching image from ipfs"/>
            <video src={proposalData.video} alt="Problem in fetching image from ipfs"/> */}
                    <p className="text-black text-xl 4xl:text-4xl mt-10 4xl:mt-16 text-justify">
                      {campaignData.description}
                    </p>
                    <p className="text-2xl 4xl:text-5xl text-black mt-10 4xl:mt-16">
                      Proposed Usage of Donations
                    </p>
                    <p className="text-black text-xl 4xl:text-4xl mt-10 4xl:mt-16 text-justify">
                      {campaignData.breakage}
                    </p>
                  </div>
                  <div className="lg:w-1/5 w-full flex flex-col bg-indigo-100 py-3 rounded-xl mt-10 lg:mt-0 mb-10">
                    <div className="mx-4">
                      <p className="text-center 4xl:text-3xl text-lg">
                        Created by:
                      </p>
                      <p className="text-center 4xl:text-3xl text-lg mt-1 4xl:mt-6">
                        {daomember.name}
                      </p>
                      <p className="text-center 4xl:text-xl text-sm mt-0 4xl:mt-3">
                        {daomember.country}
                      </p>
                      <p className="text-center 4xl:text-xl text-sm mt-3">
                        {daomember.verified}
                      </p>
                      <p className="text-center 4xl:text-2xl text-base mt-2">
                        {daomember.status === 0
                          ? "Not Active"
                          : daomember.status === 1
                          ? "Active"
                          : daomember.status === 2
                          ? "Removed"
                          : "Underwatch"}
                      </p>
                      <p className="text-center 4xl:text-4xl text-lg mt-7 4xl:mt-12">
                        Donation Raising
                      </p>
                      <p className="text-center text-3xl 4xl:text-5xl mt-3">
                        $ {`${campaignData.amount}`}
                      </p>
                      <p className="text-center text-lg 4xl:text-4xl mt-7 4xl:mt-12">
                        Donation
                      </p>
                      <Progress
                        min={0}
                        max={campaignData.amount}
                        value={campaignData.totalFunds}
                        colorScheme="green"
                        className="mt-7 rounded-lg"
                      />
                      <p className="text-center text-lg 4xl:text-3xl mt-7 4xl:mt-12">
                        Total Donators
                      </p>
                      <p className="text-center text-2xl 4xl:text-4xl mt-1 4xl:mt-4">
                        {campaignData.totalDonors}
                      </p>
                      <button
                        className="bg-white text-blue-500 hover:text-white hover:bg-blue-500 transition duration-200 text-xl 4xl:text-3xl px-10 py-2 rounded-xl items-center flex mx-auto mt-10"
                        onClick={() => {
                          router.push(
                            `/pay/${campaignData.campaignID}?name=${campaignData.title}`
                          );
                        }}
                      >
                        Donate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificCampaign;
