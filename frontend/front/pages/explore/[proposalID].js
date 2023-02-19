import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAO_CONTRACT_ABI,
  DAO_CONTRACT_ADDRESS,
} from "../../constants/constants";
import { ethers } from "ethers";
import { Spinner } from "@chakra-ui/react";

const SpecificProposal = () => {
  const [proposalID, setProposalID] = useState();
  const [proposalData, setProposalData] = useState();
  const router = useRouter();
  const [daomemberData, setDaoMemberData] = useState();
  const [loading, setLoading] = useState();

  // console.log(proposalID);

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const DAO_Contract = useContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: DAO_CONTRACT_ABI,
    signerOrProvider: signer || provider,
  });

  const fetchProposal = async (proposalId) => {
    try {
      setLoading(true);
      /// Then fetch specific Data for the same
      const data = await DAO_Contract.proposals(proposalId);
      // console.log(parseInt(data.amountReq));
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
      setLoading(false);
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
      setDaoMemberData(memberData);
      return memberData;
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(proposalData.status)
  // console.log(proposalData.image)

  const timeofproposal = () => {
    var date = new Date(proposalData.startTime * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  };

  const getStatus = (status) => {
    // console.log(status);
    if (status == 1) {
      return "NOTACTIVE";
    } else if (status == 2) {
      return "ACTIVE";
    } else if (status == 3) {
      return "REMOVED";
    } else if (status == 4) {
      return "UNDERWATCH";
    } else {
      return "NO INFO";
    }
  };

  const vote = async (vote) => {
    try {
      const tx = await DAO_Contract.vote(vote, proposalID);
      await tx.wait();
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(proposalData.duration)
  // console.log(proposalData.startTime)

  useEffect(() => {
    const id = router.query.proposalID;
    if (id) {
      setProposalID(id);
      fetchProposal(id);
    }
  }, [router.query.proposalID]);

  return (
    <div className="w-screen">
      <div className="">
        {loading ? (
          <div className="mx-auto flex justify-center mt-20">
            <Spinner size="xl" />
          </div>
        ) : (
          <div className="flex lg:flex-row flex-col">
            {proposalData ? (
              <div className="mx-auto flex lg:flex-row flex-col mt-10">
                <div className="w-4/5 justify-center flex lg:flex-row flex-col mx-auto">
                  <div className="lg:w-4/5 w-full flex flex-col items-center lg:items-start mx-auto lg:mx-6">
                    <p className="text-black text-4xl text-center">
                      {proposalData.title}
                    </p>
                    {/* <img src={proposalData.image} alt="Problem in fetching image from ipfs"/>
            <video src={proposalData.video} alt="Problem in fetching image from ipfs"/> */}
                    <img src={proposalData.image} alt="" className="mt-10" />
                    <video
                      src={proposalData.video}
                      id="my-video"
                      class="video-js"
                      controls
                      preload="auto"
                      width="640"
                      height="264"
                      data-setup="{}"
                      className="mt-5"
                    ></video>
                    <p className="text-black text-xl mt-10 text-justify">
                      {proposalData.description}
                    </p>
                    <p className="text-2xl text-black mt-10">
                      Proposed Usage of Donations
                    </p>
                    <p className="text-black text-xl mt-10 text-justify">
                      {proposalData.breakage}
                    </p>
                  </div>
                  <div className="lg:w-1/5 w-full flex flex-col bg-indigo-100 py-3 rounded-xl mt-10 lg:mt-0 mb-10">
                    <div className="mx-4">
                      <p className="text-center text-lg">Created by:</p>
                      <p className="text-center text-lg mt-1">
                        {daomemberData.name}
                      </p>
                      <p className="text-center text-sm mt-0">
                        {daomemberData.country}
                      </p>
                      <p className="text-center text-sm mt-3">
                        {proposalData.verified}
                      </p>
                      <p className="text-center text-base mt-2">
                        {getStatus(proposalData.status)}
                      </p>
                      <p className="text-center text-lg mt-7">
                        Donation Raising
                      </p>
                      <p className="text-center text-3xl mt-3">
                        $ {`${proposalData.amount}`}
                      </p>
                      <p className="text-center text-lg mt-7">
                        Voting Starting At:
                      </p>
                      <p className="text-center text-xl mt-2">
                        {timeofproposal()}
                      </p>
                      <p className="text-center text-2xl mt-7">Vote</p>
                      <div className="items-center mt-7 mx-auto flex flex-col justify-center">
                        <button className="mx-3 px-10 py-3 bg-white rounded-xl hover:bg-slate-100">
                          Yes
                        </button>
                        <button className="mx-3 px-10 py-3 bg-white rounded-xl hover:bg-slate-100 mt-5">
                          No
                        </button>
                      </div>
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

export default SpecificProposal;
