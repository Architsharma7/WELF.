import React from 'react'

const Proposalamount = ({proposalForm,setProposalForm}) => {
  const prefix ="$"
  return (
    <div className="flex flex-col">
      <p className="text-black text-5xl mt-7">
      How much money will be required?
      </p>
      <p className="text-black text-xl mt-5">
      In USD
      </p>
      <input
        className="mt-6 px-5 w-full py-2 text-2xl border-blue-500 border rounded-xl"
        type="text"
        placeholder={`$`}
        value={proposalForm.donation}
        prefix={prefix}
        onChange={(event) => {setProposalForm({...proposalForm, donation:event.target.value})}}
      ></input>
      <p className="text-black text-3xl mt-9">
      Also, Please specify, how will this money help and will be spent?
      </p>
      <p className="text-black text-xl mt-3">
        A basic idea of the money usage will suffice 
      </p>
      <textarea
        className="mt-6 px-5 w-full py-2 text-xl border-blue-500 border rounded-xl h-[100px]"
        type="text"
        placeholder=""
        value={proposalForm.donationbreakage}
        onChange={(event) => {setProposalForm({...proposalForm, donationbreakage:event.target.value})}}
      ></textarea>
    </div>
  )
}

export default Proposalamount;