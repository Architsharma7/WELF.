import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  FUNDMANAGER_CONTRACT_ABI,
  FUNDMANAGER_CONTRACT_ADDRESS,
} from "../../constants/constants";
import { ethers } from "ethers";
// import { useRouter } from "next/router";

const Pay = () => {
  const [campaignID, setCampaignID] = useState();
  const [campaignName, setCampaignName] = useState();
  const router = useRouter();

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const FUNDMANAGER_Contract = useContract({
    address: FUNDMANAGER_CONTRACT_ADDRESS,
    abi: FUNDMANAGER_CONTRACT_ABI,
    signerOrProvider: signer || provider,
  });

  const [payable, setPayable] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = router.query.payID;
    const name = router.query.name;
    if (id) {
      setCampaignID(id);
      setCampaignName(name);
    }
  }, [router.query.payID]);

  // const getCampaignData = () => {
  //   try {
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const pay = async () => {
    try {
      setLoading(true);
      const amount = ethers.utils.parseEther(payable);
      const tx = await FUNDMANAGER_Contract.donateCampaign(
        address,
        amount,
        campaignID,
        { value: amount }
      );

      await tx.wait();
      setLoading(false);
      router.push("/thankyou");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="xl:w-screen w-4/5 mx-auto flex">
      <div className="mx-auto flex flex-col justify-center align-middle mt-20">
        <p className="text-black text-5xl">
          Donate for {campaignName ? campaignName : "proposal"}
        </p>
        <p className="text-black text-3xl mt-10">Enter Amount (in BIT)</p>
        <input
          type="number"
          className="border border-blue-400 xl:py-2 py-1 mt-5 rounded-md px-4"
          onChange={(e) => setPayable(e.target.value)}
        />
        {loading ? (
          <button className="bg-blue-500 px-10 py-3 mt-10 text-white rounded-xl text-xl">
            Loading...
          </button>
        ) : (
          <button
            className="bg-blue-500 px-10 py-3 mt-10 text-white rounded-xl text-xl"
            onClick={() => pay()}
          >
            Pay {payable ? payable : 0} BIT
          </button>
        )}
      </div>
    </div>
  );
};

export default Pay;
