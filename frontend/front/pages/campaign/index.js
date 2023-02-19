import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  FUNDMANAGER_CONTRACT_ABI,
  FUNDMANAGER_CONTRACT_ADDRESS,
  DAO_CONTRACT_ABI,
  DAO_CONTRACT_ADDRESS,
} from "../../constants/constants";
import { ethers } from "ethers";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Campaign = () => {
  const [campaigns, setCampaigns] = useState();
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const router = useRouter();
  const [loading, setloading] = useState();

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

  const [data, setData] = useState();

  const fetchData = async () => {
    return await fetch(
      "https://bafkreic5sd2ft3z5ianuf5iqz2rt4d27tmorlau3xaajup6c3ria7ykg2q.ipfs.w3s.link/"
    )
      .then((response) => response.json())
      .then((value) => setData(value));
  };

  useEffect(() => {
    fetchData();
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setloading(true);
      /// fetch all the proposals , open for Voting
      const totalCampaigns = parseInt(
        await FUNDMANAGER_Contract.totalCampaigns()
      );
      // console.log(totalCampaigns);
      const promises = [];

      for (let i = 0; i < totalCampaigns; i++) {
        const data = fetchCampaign(i);
        promises.push(data);
      }

      const campaignsData = await Promise.all(promises);
      console.log(campaignsData);
      setCampaigns(campaignsData);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCampaign = async (campaignID) => {
    try {
      /// Then fetch specific Data for the same
      const data = await FUNDMANAGER_Contract.getCampaignData(campaignID);
      // console.log(data);
      const proposalData = await (await fetch(data._infoCID)).json();
      // console.log(proposalData);

      // User Data
      // const userData = await getUserData(data.Creator);
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
        totalFunds: parseInt(data.totalFunds),
        totalReq: parseInt(data.totalRequested),
        totalDonors: parseInt(data.totalDonors),
      };
      // console.log(finalData);
      return finalData;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen">
      <div className="w-4/5 flex justify-center mx-auto flex-col items-center">
        <p className="text-3xl mt-10">Campaigns</p>
        {loading ? (
          <div className="mx-auto flex justify-center mt-20">
            <Spinner size="xl" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 grid-cols-1 mt-20 w-full items-center text-center gap-x-6 gap-y-10">
            {campaigns ? (
              campaigns.map((campaign) => {
                return (
                  <Link href={`/campaign/${campaign.campaignID}`}>
                    <div className="flex flex-col items-center bg-slate-100 shadow-xl border-black border rounded-xl px-4 py-3 h-[450px]">
                      <div className="h-[270px]">
                        {/* {data ? <img src={URL.createObjectURL(data.images)} alt=""/> : <p>Image Not Found</p>} */}
                        <img
                          src="https://ichef.bbci.co.uk/news/976/cpsprodpb/C706/production/_128605905_1d1fa2c80e3674572eb5b6bd6df8b395a897778b553_903_4644_26124644x2612.jpg"
                          alt="earthqauke"
                          className="w-[325px] 3.5xl:w-[450px] 4xl:w-[600px] h-[240px] object-fill"
                        />
                      </div>
                      <div className="text-center mx-auto">
                        <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2 text-2xl">
                          {campaign.title}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2 text-sm">
                          by {campaign.creatorAddress}
                        </p>
                      </div>
                      <div className="text-center mt-2">
                        <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2">
                          {campaign.description}
                        </p>
                      </div>
                      <div className="text-center mt-2">
                        <p>Amount raised</p>
                        <p className="text-ellipsis overflow-hidden">
                          {campaign.amount}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p>No Campaigns Found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaign;
