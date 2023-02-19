import React, { useState, useMemo, useEffect } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import { StoreContent } from "../functions/ipfsstorage";
import { storeProposal } from "../functions/ipfsstorage";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  DAO_CONTRACT_ABI,
  DAO_CONTRACT_ADDRESS,
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
} from "../constants/constants";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { Spinner } from "@chakra-ui/react";

const Onboarding = () => {
  const price = ethers.utils.parseEther("0.05");
  const [memberData, setMemberData] = useState({
    name: "",
    bio: "",
    pincode: "", // store the pincode here
  });
  const [files, setFiles] = useState([]);
  const [location, setLocation] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const NFT_Contract = useContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    signerOrProvider: signer || provider,
  });

  const DAO_Contract = useContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: DAO_CONTRACT_ABI,
    signerOrProvider: signer || provider,
  });

  const uploadData = async () => {
    try {
      setLoading(true);
      // console.log(location.label, memberData, files);
      if (!files)
        toast({
          title: "Please set an Image",
          description: "",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      const pfpcid = await StoreContent(files);
      const pfpURL = `https://ipfs.io/ipfs/${pfpcid}`;
      // setMemberData({ ...memberData, pfp: pfpURL });
      const data = {
        name: memberData.name,
        bio: memberData.bio,
        pfp: pfpURL,
        pincode: memberData.pincode,
        country: location.label,
      };
      // console.log(pfpURL);
      const memberCID = await storeProposal(data);
      const memberIPFSURL = `https://w3s.link/ipfs/${memberCID}`;
      console.log(memberIPFSURL);
      setIpfsUrl(memberIPFSURL);
      mintNFT(memberIPFSURL);
    } catch (err) {
      console.log(err);
    }
  };

  const mintNFT = async (ipfsURL) => {
    try {
      /// mint the NFT by staking some amount
      console.log("Minting the NFT");
      console.log("Staking 0.05 to mint the NFT");
      const tx = await NFT_Contract.safeMint(address, { value: price });

      await tx.wait();

      console.log("NFT Minted");
      console.log(tx);
      const data = await provider.getTransactionReceipt(tx.hash);
      console.log(parseInt(data.logs[1].topics[3]));
      const tokenId = parseInt(data.logs[1].topics[3]);

      ///check the TokenID in the log if there , or find out the Id from the contract
      addRecord(tokenId, ipfsURL);
    } catch (error) {
      console.log(error);
    }
  };

  const addRecord = async (tokenId, ipfsURL) => {
    try {
      console.log("Adding Member to the DAO ...");
      const tx = await DAO_Contract.addDAOMember(tokenId, ipfsURL, [0]);
      await tx.wait();
      console.log("Record Added to the DAO");
      console.log(tx);
      setLoading(false);
      toast({
        title: "Added to WELFDAO.",
        description: "We've created your account for you.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      router.push("/dashboard");
    } catch (error) {
      console.log(error.data);
    }
  };

  // const fetchLocation = async( ) => {
  //   return await fetch(`https://app.zipcodebase.com/api/v1/search?apikey=ee376e80-b02a-11ed-a435-e3faa9ec003f&codes=${memberData.pincode}`)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));}

  //   useEffect(() => {
  //     fetchLocation()
  //   },[uploadData])

  return (
    <div className="w-screen">
      <div className="lg:w-2/5 w-4/5 md:w-3/5 mx-auto">
        <div className="flex flex-col mx-auto mt-14">
          <p className="text-6xl text-center 4xl:text-8xl">
            Join &nbsp;WELFDAO
          </p>
          <p className="text-3xl 4xl:text-5xl justify-start mt-10 4xl:mt-20">
            Name
          </p>
          <input
            type="text"
            className="mt-3 border-blue-700 border py-1 px-3 rounded-md 4xl:text-3xl 4xl:mt-6"
            value={memberData.name}
            onChange={(e) =>
              setMemberData({ ...memberData, name: e.target.value })
            }
            required={true}
          ></input>
          <p className="text-3xl 4xl:text-5xl justify-start mt-10 4xl:mt-20">
            Short Bio
          </p>
          <input
            type="text"
            className="mt-3 border-blue-700 border py-1 px-3 rounded-md 4xl:text-3xl 4xl:mt-6"
            value={memberData.bio}
            onChange={(e) =>
              setMemberData({ ...memberData, bio: e.target.value })
            }
            required={true}
          ></input>
          <p className="text-3xl 4xl:text-5xl justify-start mt-10 4xl:mt-20">
            PinCode
          </p>
          <input
            type="number"
            className="mt-3 border-blue-700 border py-1 px-3 rounded-md 4xl:text-3xl 4xl:mt-6"
            value={memberData.pincode}
            onChange={(e) =>
              setMemberData({ ...memberData, pincode: e.target.value })
            }
            required={true}
          ></input>
          <p className="text-3xl 4xl:text-5xl justify-start mt-10 4xl:mt-20">
            Country
          </p>
          <Select
            options={options}
            className="mt-4 4xl:text-3xl 4xl:mt-6"
            name="Select Country"
            onChange={(location) => setLocation(location)}
            // onChange ={(e) => setMemberData({...memberData, locationofmember: e.})}
          ></Select>
          <p className="text-3xl 4xl:text-5xl justify-start mt-10 4xl:mt-20">
            Profile Picture
          </p>
          <div className="flex justify-center mx-auto border border-dashed border-black h-[100px] xl:w-[500px] lg:w-[400px] w-[300px] md:w-[400px] 4xl:h-[300px] 4xl:w-[1000px] mt-5 4xl:mt-16">
            <div className="flex justify-center my-auto mx-auto">
              <input
                type="file"
                accept="image/*"
                className="4xl:text-3xl text-sm lg:text-base"
                onChange={(e) => setFiles(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        {loading ? (
          <div>
            <button
              className="flex justify-center mx-auto px-16 py-3 rounded-lg mt-16  border border-violet-500 bg-violet-500 text-white transition duration-200 text-xl 4xl:text-3xl 4xl:mt-24 mb-10"
              disabled={true}
            >
              <Spinner size="lg" label="Uploading Data to IPFS" />
            </button>
          </div>
        ) : (
          <button
            className="flex justify-center mx-auto px-16 py-3 rounded-lg mt-16 bg-white border border-violet-500 hover:scale-110 hover:bg-violet-500 hover:text-white transition duration-200 text-xl 4xl:text-3xl 4xl:mt-24 mb-10"
            onClick={() => uploadData()}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
