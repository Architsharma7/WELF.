import React, { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  REGISTERY_CONTRACT_ABI,
  REGISTERY_CONTRACT_ADDRESS,
} from "../constants/constants";
import { ethers } from "ethers";

const Donatordashboard = () => {
  const [userData, setUserData] = useState();
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const REGISTERY_Contract = useContract({
    address: REGISTERY_CONTRACT_ADDRESS,
    abi: REGISTERY_CONTRACT_ABI,
    signerOrProvider: signer || provider,
  });

  useEffect(() => {
    if (address) {
      getUserData();
    }
  }, [address]);

  const getUserData = async () => {
    try {
      const data = await REGISTERY_Contract.getUserData(address);
      console.log(data);

      /// Fetch data for the address from the chain , and filter for all the tx using

      /// Also deal with profileCID and fetch the User Data

      const finaldata = {
        profileCID: data.profileCID,
        totalAmountDonated: parseInt(data.totalAmountDonated),
        campaignIDs: data.campaignIDs,
        totalTxs: [],
      };

      console.log(finaldata);
      setUserData(finaldata);

      // to show the remaining data , need to set then first
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen">
      {isConnected ? (
      <div className=" xl:w-/5 w-screen flex mx-auto justify-center">
        {userData && (
          <div className="flex flex-col justify-center mx-auto mt-10 text-center">
            <p className="xl:text-5xl text-2xl text-black">{userData.profileCID}</p>
            <span className="">
              {" "}
              <p className="xl:text-2xl text-base text-black mt-4">{address}</p>
              {/* <a href="/">Not Verified</a> */}
              {/* <p>{data.shortname}</p>  */}
            </span>
            <div className="mt-20">
              <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                  <Tab>Proposals Donated To</Tab>
                  <Tab>Total Amount Donated</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {userData.totalTxs ? (
                      userData.totalTxs.map((tx) => {
                        return <p>{tx}</p>;
                      })
                    ) : (
                      <p className="text-xl text-black">"No txs found"</p>
                    )}
                  </TabPanel>
                  <TabPanel>
                    <p>{userData.totalAmountDonated}</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </div>
        )}
      </div> ) : (<div>
        <p className="text-5xl text-center mt-20">Please Connect to wallet</p>
      </div>) }
    </div>
  );
};

export default Donatordashboard;
