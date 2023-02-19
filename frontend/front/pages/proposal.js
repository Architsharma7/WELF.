import React, { useState } from "react";
import Proposalamount from "../components/proposalamount";
import Proposaldesc from "../components/proposaldesc";
import Proposalimage from "../components/proposalimage";
import Proposalpreview from "../components/proposalpreview";
import ProposalTitle from "../components/ProposalTitle";
import styles from "../styles/progressbar.module.css";
import { StoreContent, storeProposal } from "../functions/ipfsstorage";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAO_CONTRACT_ABI,
  DAO_CONTRACT_ADDRESS,
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
} from "../constants/constants";
import { ethers } from "ethers";

const Proposal = () => {
  const [page, setPage] = useState(0);
  const formTitles = ["title", "desc", "amount", "image", "preview"];
  const [proposalForm, setProposalForm] = useState({
    title: "",
    desc: "",
    donation: "",
    donationbreakage: "",
    images: "",
  });
  const [files, setFiles] = useState([]);
  const [videoFile, setVideoFile] = useState([]);

  const [ipfsLink, setIpfsLink] = useState("");

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const DAO_Contract = useContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: DAO_CONTRACT_ABI,
    signerOrProvider: signer || provider,
  });

  const PageDisplay = () => {
    if (page == 0) {
      return (
        <ProposalTitle
          proposalForm={proposalForm}
          setProposalForm={setProposalForm}
        />
      );
    }
    if (page == 1) {
      return (
        <Proposaldesc
          proposalForm={proposalForm}
          setProposalForm={setProposalForm}
        />
      );
    }
    if (page == 2) {
      return (
        <Proposalamount
          proposalForm={proposalForm}
          setProposalForm={setProposalForm}
        />
      );
    }
    if (page == 3) {
      return (
        <Proposalimage
          proposalForm={proposalForm}
          setProposalForm={setProposalForm}
          imageFile={files}
          setImageFile={setFiles}
        />
      );
    }
    if (page == 4) {
      return <Proposalpreview proposalForm={proposalForm} />;
    }
  };

  const uploadData = async () => {
    try {
      /// Image upload
      if (!files) console.log("No Image file added");
      // console.log(files);
      const imagecid = await StoreContent(files);
      const imageURL = `https://w3s.link/ipfs/${imagecid}`;
      console.log(imageURL);

      // if (!videoFile) console.log("No Image file added");
      // const videoCID = await StoreContent(videoFile);
      // const videoURL = `https://w3s.link/ipfs/${videoCID}`;
      // console.log(videoURL);
      const videoURL = "";

      const proposal = {
        title: proposalForm.title,
        desc: proposalForm.desc,
        donation: proposalForm.donation,
        donationbreakage: proposalForm.donationbreakage,
        imageCID: imageURL,
        videoCID: videoURL,
      };

      const proposalCID = await storeProposal(proposal);
      const IPFSURL = `https://w3s.link/ipfs/${proposalCID}`;
      console.log(IPFSURL, "IPFSURL");
      setIpfsLink(IPFSURL);
      addData(IPFSURL);
    } catch (error) {
      console.log(error);
    }
  };

  const addData = async (ipfsURL) => {
    try {
      console.log("Adding data to the record ");
      const amount = ethers.utils.parseEther(proposalForm.donation);
      const duration = 864000;
      const tx = await DAO_Contract.createProposal(ipfsURL, amount, duration);
      await tx.wait();
      console.log(tx);
      console.log("Proposal Added to the contract");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen">
      <div className="flex flex-col justify-center mx-auto items-center">
        <div className="mt-10">
          <div className={styles.progressbar}>
            <div
              style={{
                width:
                  page === 0
                    ? "20%"
                    : page == 1
                    ? "40%"
                    : page == 2
                    ? "60%"
                    : page == 3
                    ? "80%"
                    : "100%",
              }}
            ></div>
          </div>
        </div>
        <div className="w-4/5 lg:w-3/5">
          <div className="flex flex-col justify-center mx-auto mt-10">
            {PageDisplay()}
          </div>
          <div className="flex mt-10 justify-between mb-10">
            <button
              className={`bg-violet-400 px-7 4xl:px-12 md:py-2 py-1 4xl:py-3 rounded-lg text-center text-white hover:scale-110 transition duration-200 4xl:text-4xl ${
                page == 0 ? "invisible" : "visible"
              }`}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              previous
            </button>
            <button
              className="bg-violet-400 px-7 4xl:px-12 md:py-2 py-1 4xl:py-3 rounded-lg text-center text-white hover:scale-110 transition duration-200 4xl:text-4xl"
              onClick={() => {
                if (page === formTitles.length - 1) {
                  // alert("form submitted");
                  uploadData();
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
            >
              {page == formTitles.length - 1 ? "submit" : "next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
