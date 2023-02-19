import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const Donatordashboard = () => {
  return (
    <div className="w-screen">
    <div className=" xl:w-/5 w-screen flex mx-auto justify-center">
      <div className="flex flex-col justify-center mx-auto mt-10 text-center">
        <p className="xl:text-5xl text-2xl text-black">User Name</p>
        <span className="">
          {" "}
          <p className="xl:text-2xl text-base text-black mt-4">
            0x9B855D0Edb3111891a6A0059273904232c74815D
          </p>
          <a href="/">Not Verified</a>
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
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Donatordashboard