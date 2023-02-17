import React from "react";

const Proposalpreview = ({proposalForm}) => {
  return (
    <div className="flex flex-col">
      <p className="text-black lg:text-6xl text-4xl mt-7 4xl:text-8xl">
        Preview Your Proposal
      </p>
      <p className="mt-10 text-3xl 4xl:text-5xl 4xl:mt-16">
        Proposal Title
      </p>
      <p className="mt-3 text-2xl 4xl:text-4xl 4xl:mt-6">
        {proposalForm.title}
      </p>
      <p className="mt-10 text-3xl 4xl:text-5xl 4xl:mt-16">
        Proposal Description
      </p>
      <p className="mt-3 text-2xl 4xl:text-4xl 4xl:mt-6">
        {proposalForm.desc}
      </p>
      <p className="mt-10 text-3xl 4xl:text-5xl 4xl:mt-16">
        Donation Required
      </p>
      <p className="mt-3 text-2xl 4xl:text-4xl 4xl:mt-6">
        $ {proposalForm.donation}
      </p>
      <p className="mt-10 text-3xl 4xl:text-5xl 4xl:mt-16">
        Donation Usage BreakDown
      </p>
      <p className="mt-3 text-2xl 4xl:text-4xl 4xl:mt-6 4xl:mb-10">
        {proposalForm.donationbreakage}
      </p>
      <p className="mt-10 text-3xl 4xl:text-5xl 4xl:mt-16">
        Image Chosen
      </p>
      <img src={proposalForm.images} alt="hello" className="mt-3 4xl:mt-6 4xl:mb-10 w-[200px] h-[100px]"/>
    </div>
  );
};

export default Proposalpreview;
