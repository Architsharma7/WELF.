import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <div className="w-screen">
      <div className="w-3/5 flex mx-auto">
        <div className="flex flex-col justify-center mx-auto mt-10 text-center">
          <p className="text-5xl text-black">User Name</p>
          <span className="">
            {" "}
            <p className="text-2xl text-black mt-4">
              0x9B855D0Edb3111891a6A0059273904232c74815D
            </p>
            <a href="/">Verified</a>
          </span>
          <p className="text-xl mt-4 text-gray-500">New Delhi, India</p>
          <div className="mt-20">
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>Proposals Created</Tab>
                <Tab>Proposals Elected</Tab>
                <Tab>Proposals Voted On</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
