import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAO_CONTRACT_ABI,
  DAO_CONTRACT_ADDRESS,
} from "../../constants/constants";
import { ethers } from "ethers";

const CreatorProfile = () => {
  const [creatorAddress, setCreatorAddress] = useState();
  const router = useRouter();

  const { address, isConnected } = useAccount();
  const provider = useProvider();

  const DAO_Contract = useContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: DAO_CONTRACT_ABI,
    signerOrProvider: provider,
  });

  useEffect(() => {
    const address = router.query.address;
    if (address) {
      const creatorAddress = router.query.address;
      console.log(creatorAddress);
      setCreatorAddress(creatorAddress);
    }
  }, [router.query.address]);

  return (
    <div className="w-screen flex h-screen">
      <div className="mx-auto flex justify-center align-middle">
        <p className="text-black text-8xl">Creator : {creatorAddress}</p>
      </div>
    </div>
  );
};

export default CreatorProfile;
