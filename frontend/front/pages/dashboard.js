import React, { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { DAO_CONTRACT_ABI, DAO_CONTRACT_ADDRESS } from "../constants/constants";
import { ethers } from "ethers";

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const DAO_Contract = useContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: DAO_CONTRACT_ABI,
    signerOrProvider: signer || provider,
  });

  const [createdProposals, setCreatedProposals] = useState([]);
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (address) {
      getUserData();
    }
  }, [address]);

  const getUserData = async () => {
    try {
      const data = await DAO_Contract.getMemberData(address);
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
        proposalIDs: data.proposalIDs,
        status: data.status,
      };
      setUserData(memberData);
      // console.log(memberData);
      fetchProposals(data.proposalIDs);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProposals = async (ids) => {
    try {
      // console.log(ids);
      let finalIds = [];
      ids.map((id) => {
        finalIds.push(parseInt(id));
      });

      const promises = [];
      // console.log(finalIds);
      finalIds.map((id) => {
        const proposalData = fetchProposal(id);
        promises.push(proposalData);
      });

      const proposals = await Promise.all(promises);
      console.log(proposals);
      setCreatedProposals(proposals);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProposal = async (id) => {
    try {
      const data = await DAO_Contract.proposals(id);
      // console.log(data);
      const proposalData = await (await fetch(data._infoCID)).json();
      // console.log(proposalData);
      const finalData = {
        proposalID: id,
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
      return finalData;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-screen">
      {userData ? (
        <div className=" xl:w-/5 w-screen flex mx-auto justify-center">
          <div className="flex flex-col justify-center mx-auto mt-10 text-center">
            <p className="xl:text-5xl text-2xl text-black">{userData.name}</p>
            <span className="">
              {" "}
              <p className="xl:text-2xl text-base text-black mt-4">{address}</p>
              <a href="/">{userData.verified ? "Verified" : "Not Verified"}</a>
            </span>
            {/* /// Need to fetch the Location and area from the pincode */}
            <p className="text-xl mt-4 text-gray-500">{userData.country}</p>
            <div className="mt-20">
              <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                  <Tab>Proposals Created</Tab>
                  <Tab>Proposals Elected</Tab>
                  <Tab>Proposals Voted On</Tab>
                  <Tab>Proposals Cancelled</Tab>
                </TabList>
                {createdProposals ? (
                  <TabPanels>
                    <TabPanel>
                      {createdProposals.map((proposal) => {
                        return <p>{proposal.title}</p>;
                      })}
                    </TabPanel>
                    <TabPanel>
                      {createdProposals.map((proposal) => {
                        if (proposal.status == 0) {
                          return <p>{proposal.title}</p>;
                        }
                      })}
                    </TabPanel>
                    <TabPanel>
                      {createdProposals.map((proposal) => {
                        if (proposal.status == 4) {
                          return <p>{proposal.title}</p>;
                        }
                      })}
                    </TabPanel>
                    <TabPanel>
                      {createdProposals.map((proposal) => {
                        if (proposal.status == 5) {
                          return <p>{proposal.title}</p>;
                        }
                      })}
                    </TabPanel>
                  </TabPanels>
                ) : (
                  <p>No Proposal Created</p>
                )}
              </Tabs>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen">
          <div className="flex justify-center mx-auto my-auto mt-32 items-center">
            <p className="text-3xl text-black mx-4">
              Please connect wallet to see your Dashboard
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
