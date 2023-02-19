import React from "react";
import { useRouter } from "next/router";

const SpecificCampaign = () => {
  const router = useRouter();
  const campaignID = router.query.campaignID;
  // console.log(campaignID);
  return (
    <div className="w-screen flex h-screen">
      <div className="mx-auto flex justify-center align-middle">
        <p className="text-black text-8xl">{campaignID} Campaign id</p>
      </div>
    </div>
  );
};

export default SpecificCampaign;
