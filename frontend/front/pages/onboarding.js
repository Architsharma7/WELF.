import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";

const Onboarding = () => {
  const [memberData, setMemberData] = useState({
    name: "",
    bio: "",
  });
  const [location, setLocation] = useState("");
  const options = useMemo(() => countryList().getData(), []);

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
            Location
          </p>
          <Select
            options={options}
            className="mt-4 4xl:text-3xl 4xl:mt-6"
            name="Select Country"
            onChange={(location) => setLocation(location)}
          ></Select>
          <p className="text-3xl 4xl:text-5xl justify-start mt-10 4xl:mt-20">Profile Picture</p>
          <div className="flex justify-center mx-auto border border-dashed border-black h-[100px] xl:w-[500px] lg:w-[400px] w-[300px] md:w-[400px] 4xl:h-[300px] 4xl:w-[1000px] mt-5 4xl:mt-16">
            <div className="flex justify-center my-auto mx-auto">
              <input
                type="file"
                accept="image/*"
                className="4xl:text-3xl text-sm lg:text-base"
              />
            </div>
          </div>
        </div>
        <button
          className="flex justify-center mx-auto px-16 py-3 rounded-lg mt-16 bg-white border border-violet-500 hover:scale-110 hover:bg-violet-500 hover:text-white transition duration-200 text-xl 4xl:text-3xl 4xl:mt-24 mb-10"
          onClick={() => console.log(location.label, memberData)}
        >
          Stake &nbsp;0.001ETH
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
