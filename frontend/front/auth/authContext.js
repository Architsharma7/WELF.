import { storeProposal } from "../functions/ipfsstorage";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../constants/constants";
import React, { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/router";
import { publicPaths } from "../constants/publicPath";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const router = useRouter();
  const [isDAOMember, setIsDAOMember] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const NFT_Contract = useContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    signerOrProvider: signer || provider,
  });

  const checkUser = async () => {
    try {
      const data = parseInt(await NFT_Contract.balanceOf(address));
      if (data > 0) {
        setIsDAOMember(true);
      }
      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [address]);

  // useEffect(() => {
  //   const authCheck = () => {
  //     // console.log(router);
  //     if (
  //       !isDAOMember &&
  //       !publicPaths.includes(router.pathname.split("?")[0])
  //     ) {
  //       console.log("NOT A PUBLIC ROUTE");
  //       setAuthorized(false);
  //       // dispatch(setRedirectLink({ goto: router.asPath }));
  //       void router.push({
  //         pathname: "/onboarding",
  //       });
  //     } else {
  //       setAuthorized(true);
  //     }
  //   };

  //   authCheck();

  //   const preventAccess = () => setAuthorized(false);

  //   router.events.on("routeChangeStart", preventAccess);
  //   router.events.on("routeChangeComplete", authCheck);

  //   return () => {
  //     router.events.off("routeChangeStart", preventAccess);
  //     router.events.off("routeChangeComplete", authCheck);
  //   };
  // }, [router, router.events, address, isDAOMember]);

  const value = {
    isDAOMember,
    authorized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
