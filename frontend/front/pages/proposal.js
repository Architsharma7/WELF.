import React, { useState } from "react";
import Proposalamount from "../components/proposalamount";
import Proposaldesc from "../components/proposaldesc";
import ProposalTitle from "../components/ProposalTitle";
import styles from "../styles/progressbar.module.css";

const Proposal = () => {
  const [page, setPage] = useState(0);
  const formTitles = ["title", "desc", "amount"];

  const PageDisplay = () => {
    if (page == 0) {
      return <ProposalTitle/>;
    }
    if (page == 1) {
      return <Proposaldesc />;
    }
    if (page == 2) {
      return <Proposalamount />;
    }
  };

  return (
    <div className="w-screen">
      <div className="flex flex-col justify-center mx-auto items-center">
        <div className="mt-10">
          <div className={styles.progressbar}>
            <div
              style={{
                width: page === 0 ? "33.33%" : page == 1 ? "66.66%" : "100%",
              }}
            ></div>
          </div>
        </div>
        <div className="w-3/5">
          <div className="flex flex-col justify-center mx-auto mt-10">
            <>
              <PageDisplay />
            </>
          </div>
          <div className="flex mt-10 justify-between">
            <button
              className={`bg-violet-400 px-7 md:py-2 py-1 rounded-lg text-center text-white hover:scale-110 transition duration-200 ${
                page == 0 ? "invisible" : "visible"
              }`}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              prev
            </button>
            <button
              className="bg-violet-400 px-7 md:py-2 py-1 rounded-lg text-center text-white hover:scale-110 transition duration-200"
              onClick={() => {
                if (page === formTitles.length - 1) {
                  alert("form submitted");
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
            >
              {page == 2 ? "submit" : "next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
