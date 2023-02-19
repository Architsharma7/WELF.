import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAO_CONTRACT_ABI,
  DAO_CONTRACT_ADDRESS,
} from "../../constants/constants";
import { ethers } from "ethers";

const Explore = () => {
  const { address, isConnected } = useAccount();
  const provider = useProvider();

  const DAO_Contract = useContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: DAO_CONTRACT_ABI,
    signerOrProvider: provider,
  });

  const [data, setData] = useState();
  const [proposals, setProposals] = useState();

  const fetchData = async () => {
    return await fetch(
      "https://bafkreic5sd2ft3z5ianuf5iqz2rt4d27tmorlau3xaajup6c3ria7ykg2q.ipfs.w3s.link/"
    )
      .then((response) => response.json())
      .then((value) => setData(value));
  };

  const fetchProposals = async () => {
    try {
      /// fetch all the proposals , open for Voting
      const totalProposals = parseInt(await DAO_Contract.totalProposals());
      // console.log(totalProposals);
      const promises = [];

      for (let i = 0; i < totalProposals; i++) {
        const data = fetchProposal(i);
        promises.push(data);
      }

      const proposals = await Promise.all(promises);
      // console.log(proposals);

      /// Then fetch specific Data for the same

      //// filter the final proposals here

      const finalProposals = [];

      proposals.map((proposal) => {
        if (proposal.status == 2) {
          finalProposals.push(proposal);
        }
      });
      console.log(finalProposals);
      setProposals(finalProposals);
    } catch (error) {
      console.log(error);
    }
  };

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
      return finalData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProposals();
  }, []);

  return (
    <div className="w-screen">
      <div className="w-4/5 flex justify-center mx-auto flex-col items-center">
        <p className="text-3xl mt-10">Proposals</p>
        <div className="grid lg:grid-cols-3 grid-cols-1 mt-20 w-full items-center text-center gap-x-6 gap-y-10">
          {proposals ? (
            proposals.map((proposal) => {
              return (
                <Link href={`/explore/${proposal.proposalID}`}>
                  <div className="flex flex-col items-center bg-slate-100 shadow-xl border-black border rounded-xl px-4 py-3 h-[450px]">
                    <div className="h-[270px]">
                      {/* {data ? <img src={URL.createObjectURL(data.images)} alt=""/> : <p>Image Not Found</p>} */}
                      <img
                        src={
                          proposal.image
                            ? proposal.image
                            : "https://ichef.bbci.co.uk/news/976/cpsprodpb/C706/production/_128605905_1d1fa2c80e3674572eb5b6bd6df8b395a897778b553_903_4644_26124644x2612.jpg"
                        }
                        alt="earthqauke"
                        className="w-[325px] 3.5xl:w-[450px] 4xl:w-[600px] h-[240px] object-fill"
                      />
                    </div>
                    <div className="text-center mx-auto">
                      <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2 text-2xl">
                        {proposal.title}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2 text-sm">
                        by{" "}
                        {`${proposal.creator.slice(
                          0,
                          5
                        )}...${proposal.creator.slice(-5)}`}
                      </p>
                    </div>
                    <div className="text-center mt-2">
                      <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2">
                        {proposal.description}
                      </p>
                    </div>
                    <div className="text-center mt-2">
                      <p>Amount to be Raised</p>
                      <p className="text-ellipsis overflow-hidden">
                        $ {proposal.amount}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p>No Proposals found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
