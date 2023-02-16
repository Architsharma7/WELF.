import React from 'react'

const Proposalamount = ({proposalForm,setProposalForm}) => {
  const prefix ="$"
  return (
    <div className="flex flex-col">
      <p className="text-black lg:text-5xl text-3xl mt-7 4xl:text-8xl">
      How much money will be required?
      </p>
      <p className="text-black text-xl mt-5 4xl:mt-10 4xl:text-3xl">
      In USD
      </p>
      <input
        className="mt-6 px-5 w-full py-2 4xl:py-4 lg:text-2xl text-xl 4xl:text-3xl border-blue-500 border rounded-xl"
        type="text"
        placeholder={`$`}
        value={proposalForm.donation}
        prefix={prefix}
        onChange={(event) => {setProposalForm({...proposalForm, donation:event.target.value})}}
      ></input>
      <p className="text-black lg:text-3xl text-2xl mt-9 4xl:mt-20 4xl:text-5xl">
      Also, Please specify, how will this money help and will be spent?
      </p>
      <p className="text-black lg:text-xl text-lg mt-3 4xl:mt-6 4xl:text-3xl">
        A basic idea of the money usage will suffice, an example structure is given below
      </p>
      <textarea
        className="mt-6 px-5 w-full py-2 lg:text-xl text-base 4xl:text-3xl border-blue-500 border rounded-xl h-[300px] 4xl:h-[250px]"
        type="text"
        placeholder=""
        value={proposalForm.donationbreakage}
        onChange={(event) => {setProposalForm({...proposalForm, donationbreakage:event.target.value})}}
      ></textarea>
      <div className='px-5 py-4 4xl:py-6 4xl:px-8 bg-rose-100 mt-10 4xl:mt-20 rounded-xl flex flex-col'>
      <p className='text-center text-2xl 4xl:text-5xl'>Recommended Structure</p>
      <p className="text-xl mt-4 4xl:mt-8 4xl:text-4xl">1. How is the amount asked justified?</p>
      <p className="text-xl mt-4 4xl:mt-8 4xl:text-4xl">2. Give the Breakdown of the amount to be used.</p>
      <p className="mt-1 4xl:text-3xl 4xl:mt-5">Example: For an earthquake:</p>
      <p className="4xl:text-3xl 4xl:mt-2">$1000 : food supplies</p>
      <p className="4xl:text-3xl 4xl:mt-2">$3000 : medical expenses</p>
      </div>
    </div>
  )
}

export default Proposalamount;