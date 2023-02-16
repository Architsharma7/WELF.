import React, { useState } from "react";
import Proposalamount from "../components/proposalamount";
import Proposaldesc from "../components/proposaldesc";
import Proposalimage from "../components/proposalimage";
import ProposalTitle from "../components/ProposalTitle";
import styles from "../styles/progressbar.module.css";

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
      return <Proposalimage/>;
    }
  };

  const [page, setPage] = useState(0);
  const formTitles = ["title", "desc", "amount","image"];
  const [proposalForm, setProposalForm] = useState({
    title: "",
    desc: "",
    donation: "",
    donationbreakage: "",
})

  return (
    <div className="w-screen">
      <div className="flex flex-col justify-center mx-auto items-center">
        <div className="mt-10">
          <div className={styles.progressbar}>
            <div
              style={{
                width: page === 0 ? "25%" : page == 1 ? "50%" : page == 2 ? "75%" : "100%",
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
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
            >
              {page == formTitles.length -1 ? "submit" : "next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
