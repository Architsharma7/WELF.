import React from 'react'

const Proposaldesc = ({proposalForm,setProposalForm}) => {
  return (
    <div className="flex flex-col">
      <p className="text-black text-6xl mt-7">
      Tell people more about the cause
      </p>
      <p className="text-black text-3xl mt-10">
      Start from scratch or use our recommended structure below. 
      </p>
      <textarea
        className="mt-6 px-5 w-full py-2 text-2xl border-blue-500 border rounded-xl h-[200px]"
        type="text"
        placeholder="Write the description of the cause"
        value={proposalForm.desc}
        onChange={(event) => {setProposalForm({...proposalForm, desc:event.target.value})}}
      ></textarea>
    </div>
  )
}

export default Proposaldesc;