import React, { useState } from "react";
import Proposalamount from "../components/proposalamount";
import Proposaldesc from "../components/proposaldesc";
import Proposalimage from "../components/proposalimage";
import Proposalpreview from "../components/proposalpreview";
import ProposalTitle from "../components/ProposalTitle";
import styles from "../styles/progressbar.module.css";
import { storeProposal } from "../functions/ipfsstorage";

const Proposal = () => {

  const PageDisplay = () => {
    if (page == 0) {
      return <ProposalTitle proposalForm={proposalForm} setProposalForm={setProposalForm}/>;
    }
    if (page == 1) {
      return <Proposaldesc proposalForm={proposalForm} setProposalForm={setProposalForm}/>;
    }
    if (page == 2) {
      return <Proposalamount proposalForm={proposalForm} setProposalForm={setProposalForm}/>;
    }
    if (page == 3) {
      return <Proposalimage proposalForm={proposalForm} setProposalForm={setProposalForm}/>;
    }
    if (page == 4) {
      return <Proposalpreview proposalForm={proposalForm}/>;
    }
  };

  const [page, setPage] = useState(0);
  const formTitles = ["title", "desc", "amount","image", "preview"];
  const [proposalForm, setProposalForm] = useState({
    title: "",
    desc: "",
    donation: "",
    donationbreakage: "",
    images: "",
})

  const [ipfsLink, setIpfsLink] = useState("")

  async function getProposal(){
    const CID = await storeProposal(proposalForm);
    const IPFSURL = `https://w3s.link/ipfs/${CID}`;
    console.log(IPFSURL, "IPFSURL");
    setIpfsLink(IPFSURL);
  }

  return (
    <div className="w-screen">
      <div className="flex flex-col justify-center mx-auto items-center">
        <div className="mt-10">
          <div className={styles.progressbar}>
            <div
              style={{
                width: page === 0 ? "20%" : page == 1 ? "40%" : page == 2 ? "60%" : page == 3 ? "80%" : "100%",
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
                  alert("form submitted");
                  getProposal();
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
