import React from "react";
const ProposalTitle = ({proposalForm, setProposalForm}) => {
  return (
    <div className="flex flex-col">
      <p className="text-black text-6xl mt-7">
        Let's take your first step toward change
      </p>
      <p className="text-black text-3xl mt-10">
        Tell people the cause you need help for.
      </p>
      <input
        className="mt-6 px-5 flex w-full py-2 mx-auto text-2xl border-blue-500 border rounded-xl"
        type="text"
        placeholder="Write the cause here"
        value={proposalForm.title}
        onChange={(event) => {setProposalForm({...proposalForm, title:event.target.value})}}
      ></input>
    </div>
  );
};

export default ProposalTitle;
