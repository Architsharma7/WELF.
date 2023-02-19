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
  const [creatorData, setCreatorData] = useState();
  const router = useRouter();

  const { address, isConnected } = useAccount();
  const provider = useProvider();

  const DAO_Contract = useContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: DAO_CONTRACT_ABI,
    signerOrProvider: provider,
  });

  useEffect(() => {
    const creatorAddress = router.query.address;
    if (creatorAddress) {
      console.log(creatorAddress);
      setCreatorAddress(creatorAddress);
      getUserData(creatorAddress);
    }
  }, [router.query.address]);

  const getUserData = async (creatorAddress) => {
    try {
      const data = await DAO_Contract.getMemberData(creatorAddress);
      // console.log(data);
      const ipfsData = await (await fetch(data.profileCID)).json();
      // console.log(ipfsData);
      const memberData = {
        name: ipfsData.name,
        bio: ipfsData.bio,
        pfp: ipfsData.pfp,
        country: ipfsData.country,
        tokenID: parseInt(data.NFTTokenID),
        verified: data.verified,
        status: data.status,
      };
      //   console.log(memberData);
      setCreatorData(memberData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen flex h-screen">
      <div className="mx-auto flex justify-center align-middle">
        <p className="text-black text-8xl">Creator : {creatorAddress}</p>
      </div>
    </div>
  );
};

export default CreatorProfile;
