import React from "react";
import Image from "next/image";
import wel from "../public/welfare.png";
import decen from "../public/decen.png";
import dao from "../public/dao.png";
import ipfs from "../public/ipfs.svg";
import { BiDonateHeart } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Link from "next/link";

const Mainpage = () => {
  return (
    <div className="w-screen">
      <div className="4xl:w-4/5 3.5xl:w-4/5 4xl:mx-auto 3.5xl:mx-auto xl:mt-20 lg:mt-14 4xl:mt-36 md:mt-10 mt-10 bg-indigo-400">
        <div className="flex flex-col">
          <div className="flex md:flex-row flex-col-reverse md:mb-10 mb-6 4xl:mb-16">
            <div className="md:w-1/2 w-full justify-end">
              <div className="mx-10">
                <div className="flex flex-col mx-auto justify-center items-center align-middle my-auto w-full">
                  <p className="xl:text-6xl 4xl:text-8xl lg:text-4xl md:text-2xl text-xl text-white mt-4 md:mt-0 text-center md:text-start">
                    A decentralised fundraising platform based on DAO
                    monitoring.
                  </p>
                  <p className="xl:text-3xl 4xl:text-5xl lg:text-xl md:text-lg lg:mt-10 md:mt-6 mt-6 text-center md:text-start">
                    Provides more transparency and security of donated funds.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 w-full justify-start">
              <div className="mx-10">
                <Image
                  src={wel}
                  width={600}
                  height={600}
                  alt="hello"
                  className="float-right 4xl:w-[1200px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen bg-white">
        <div className="w-4/5 lg:w-4/5 md:w-3/5 flex mx-auto">
          <div className="mt-16 flex flex-col mx-auto justify-center items-center mb-20 4xl:mb-36">
            <p className="text-3xl 4xl:text-6xl">Make a difference...</p>
            <div className="mt-10 4xl:mt-20">
              <div className="grid lg:grid-cols-3 lg:grid-rows-1 grid-rows-3 gap-x-10 gap-y-10">
                <div className="w-full py-4 4xl:py-16 px-10 border bg-neutral-100 rounded-xl flex flex-col items-center border-indigo-500">
                  <Image src={decen} height={400} width={400} alt="hello" />
                  <p className="xl:text-xl 4xl:text-4xl lg:text-lg">
                    Decentralisation provides more security and transparency of
                    the funds you donate. Ensure that every penny you spent,
                    goes to a needy one.
                  </p>
                </div>
                <div className="w-full py-4 4xl:py-16 px-10 border  bg-neutral-100 rounded-xl flex flex-col items-center border-indigo-500">
                  <Image src={dao} height={400} width={400} alt="hello" />
                  <p className="xl:text-xl 4xl:text-4xl lg:text-lg">
                    DAO structure of our platform ensures that the people
                    helping out others don't go empty handed, we incentivise
                    people who help to use the funds in a good way.
                  </p>
                </div>
                <div className="w-full py-4 4xl:py-16 px-10 border bg-neutral-100 rounded-xl flex flex-col items-center border-indigo-500">
                  <Image src={ipfs} height={400} width={400} alt="hello" />
                  <p className="xl:text-xl 4xl:text-4xl lg:text-lg">
                    We provide hassle free donations with Mantle Chain and all the data stored on IPFS which makes the data more secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="w-screen bg-white">
          <div className="lg:w-4/5 w-4/5 md:w-3/5 mx-auto bg-indigo-400 rounded-3xl">
            <div className="py-3 mx-10">
              <div className="flex lg:flex-row flex-col justify-evenly">
                <div className="flex flex-col items-center">
                  <BiDonateHeart className="text-4xl 4xl:text-8xl text-white" />
                  <p className="text-2xl 4xl:text-4xl text-white">2</p>
                  <p className="text-2xl 4xl:text-4xl text-white">Proposals</p>
                </div>
                <div className="flex flex-col items-center mt-4 md:mt-5 lg:mt-0">
                  <BsPeopleFill className="text-4xl 4xl:text-8xl text-white" />
                  <p className="text-2xl 4xl:text-4xl text-white">3+</p>
                  <p className="text-2xl 4xl:text-4xl text-white">
                    People Donated
                  </p>
                </div>
                <div className="flex flex-col items-center mt-4 md:mt-5 lg:mt-0">
                  <RiMoneyDollarCircleLine className="text-4xl 4xl:text-8xl text-white" />
                  <p className="text-2xl 4xl:text-4xl text-white">$100</p>
                  <p className="text-2xl 4xl:text-4xl text-white">
                    Money Raised
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen bg-white">
        <div className="w-4/5 flex mx-auto">
          <div className="mt-20">
            <div className="flex flex-col">
              <p className="xl:text-4xl text-3xl text-center lg:text-start text-black">
                Featured Proposals
              </p>
              <div className="grid lg:grid-cols-3 lg:grid-rows-1 grid-flow-row mt-10 gap-x-10 gap-y-10 mb-20">
                <Link href="/campaign/0">
                  <div className="flex flex-col items-center bg-slate-100 shadow-xl border-black border rounded-xl px-4 py-3 h-[450px]">
                    <div className="h-[270px]">
                      {/* {data ? <img src={URL.createObjectURL(data.images)} alt=""/> : <p>Image Not Found</p>} */}
                      <img
                        src="https://w3s.link/ipfs/bafkreielrn724islibx37nmtwjfymjq42ytv2sn4nvdazhik5x44fwlzbq"
                        alt="earthqauke"
                        className="w-[325px] 3.5xl:w-[450px] 4xl:w-[600px] h-[240px] object-fill"
                      />
                    </div>
                    <div className="text-center mx-auto">
                      <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2 text-2xl">
                        Syria Turkey Earthquake
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2 text-sm">
                        by Dhruv Agarwal
                      </p>
                    </div>
                    <div className="text-center mt-2">
                      <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2">
                      Turkey-Syria earthquake live updates: Magnitude 5.2 quake strikes central Turkey, death toll exceeds 46,000. More than 45,000 people have been killed in the earthquake that struck Turkey and Syria. The toll is expected to soar with some 264,000 apartments in Turkey destroyed and many still missing in the country’s worst modern disaster. While many international rescue teams have left the vast quake zone, domestic teams continued to search through flattened buildings on Saturday hoping to find more survivors who defied the odds. Experts say most rescues occur in the 24 hours following an earthquake. The count is expected to grow and more people are going to go homless. This is the time when the people needs our most help , and the more support and rescue we could reach out to people , the better it would be . The people are in dire need of daily essentials and shelters which could be provided from them.
                      </p>
                    </div>
                    <div className="text-center mt-2">
                      <p>Amount raising</p>
                      <p className="text-ellipsis overflow-hidden">$ 50000</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
