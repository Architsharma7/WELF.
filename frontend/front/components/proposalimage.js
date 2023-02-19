import React, { useState } from "react";

const Proposalimage = ({
  proposalForm,
  setProposalForm,
  imageFile,
  setImageFile,
  videoInput,
  setVideoInput,
}) => {
  return (
    <div className="flex flex-col">
      <p className="text-black lg:text-6xl text-4xl mt-7 4xl:text-8xl">
        Add an image
      </p>
      <p className="text-black lg:text-2xl text-xl mt-10 4xl:mt-20 4xl:text-5xl">
        Proposals with an image have chances of getting more donations than
        proposal without a image.
      </p>
      <div className="flex justify-center mx-auto border border-dashed border-black h-[100px] lg:w-[600px] w-[300px] md:w-[500px] 4xl:h-[300px] 4xl:w-[1200px] mt-5 4xl:mt-16">
        <div className="flex justify-center my-auto mx-auto">
          <input
            type="file"
            accept="image/*"
            className="4xl:text-3xl text-sm lg:text-base"
            // value={imageFile}
            onChange={(e) => {
              setImageFile(e.target.files[0]);
              setProposalForm({
                ...proposalForm,
                images: URL.createObjectURL(e.target.files[0]),
              });
            }}
          />
        </div>
      </div>
      <p className="text-black lg:text-2xl text-xl mt-10 4xl:mt-20 4xl:text-5xl">Video</p>
      <div className="flex justify-center mx-auto border border-dashed border-black h-[100px] lg:w-[600px] w-[300px] md:w-[500px] 4xl:h-[300px] 4xl:w-[1200px] mt-5 4xl:mt-16">
        <div className="flex justify-center my-auto mx-auto">
          <input
            type="file"
            accept="video/*"
            className="4xl:text-3xl text-sm lg:text-base"
            // value={imageFile}
            onChange={(e) => {
              setVideoInput(e.target.files[0]);
              setProposalForm({
                ...proposalForm,
                videos: URL.createObjectURL(e.target.files[0]),
              });
            }}
          />
        </div>
      </div>
      <p className="text-black lg:text-lg text-base mt-6 4xl:mt-12 4xl:text-3xl flex mx-auto">
        Image sizes of at least 1200 x 675 pixels will look good on all screens
      </p>
    </div>
  );
};

export default Proposalimage;
