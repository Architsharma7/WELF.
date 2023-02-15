import React, { useContext } from "react";
import ProposalContext from "../context/proposalcontext";
const ProposalTitle = () => {
  // const { proposalForm, setProposalForm } = useContext(ProposalContext);
  return (
    <div className="flex flex-col">
      <p className="text-black text-6xl">
        Let's take your first step toward change
      </p>
      <p className="text-black text-3xl mt-7">
        Tell people the cause you need help for.
      </p>
      <input
        className="mt-6 px-5 flex w-full py-2 mx-auto text-2xl border-blue-500 border rounded-xl"
        type="text"
        placeholder="hello"
        // value={proposalForm.title}
        // onChange={(event) => {
        //   setProposalForm({ ...proposalForm, title: event.target.value });
        // }}
      ></input>
    </div>
  );
};

export default ProposalTitle;
