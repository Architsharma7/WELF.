import React, { useState } from "react";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";

const Pay = () => {
  const router = useRouter();

  const payID = router.query.payID;

  const [payable, setPayable] = useState("");
  const [loading, setLoading] = useState(false);
  // console.log(payID);
  return (
    <div className="xl:w-screen w-4/5 mx-auto flex">
      <div className="mx-auto flex flex-col justify-center align-middle mt-20">
        <p className="text-black text-5xl">Donate for Proposal name</p>
        <p className="text-black text-3xl mt-10">Enter Amount (in BIT)</p>
        <input
          type="number"
          className="border border-blue-400 xl:py-2 py-1 mt-5 rounded-md px-4"
          onChange={(e) => setPayable(e.target.value)}
        />
        <button className="bg-blue-500 px-10 py-3 mt-10 text-white rounded-xl text-xl">
          Pay {payable ? payable : 0} BIT
        </button>
      </div>
    </div>
  );
};

export default Pay;
