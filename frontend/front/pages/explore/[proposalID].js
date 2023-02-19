import React from "react";
import { useRouter } from "next/router";

const SpecificProposal = () => {
  const router = useRouter();
  const proposalID = router.query.proposalID;
  // console.log(proposalID);
  return (
    <div className="w-screen flex h-screen">
      <div className="mx-auto flex justify-center align-middle">
        <p className="text-black text-8xl">{proposalID} proposal id</p>
      </div>
    </div>
  );
};

export default SpecificProposal;
