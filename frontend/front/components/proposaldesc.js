import React from 'react'

const Proposaldesc = ({proposalForm,setProposalForm}) => {
  return (
    <div className="flex flex-col">
      <p className="text-black lg:text-6xl text-4xl mt-7 4xl:text-8xl">
      Tell people more about the cause
      </p>
      <p className="text-black lg:text-3xl text-xl mt-10 4xl:text-6xl 4xl:mt-20">
      Start from scratch or use our recommended structure below. 
      </p>
      <textarea
        className="mt-6 4xl:mt-16 px-5 w-full py-2 lg:text-2xl text-base 4xl:text-3xl border-blue-500 border rounded-xl h-[300px] 4xl:h-[500px]"
        type="text"
        placeholder="Write the description of the cause"
        value={proposalForm.desc}
        onChange={(event) => {setProposalForm({...proposalForm, desc:event.target.value})}}
      ></textarea>
      <div className='px-5 4xl:px-10 4xl:py-7 py-4 bg-rose-100 mt-10 rounded-xl flex flex-col'>
        <p className='text-center text-2xl 4xl:text-5xl'>Recommended Structure</p>
        <p className="text-xl mt-4 4xl:mt-8 4xl:text-4xl">Paragraph 1: Who is impacted?</p>
        <p className='4xl:text-3xl 4xl:mt-2'>Describe how people are concretely affected by the problem.</p>
        <p className="text-xl mt-4 4xl:mt-8 4xl:text-4xl">Paragraph 2: What is at stake?</p>
        <p className='4xl:text-3xl 4xl:mt-2'>Explain what it will mean if things change or stay the same.</p>
        <p className="text-xl mt-4 4xl:mt-8 4xl:text-4xl">Paragraph 3: Why is now the time to act?</p>
        <p className='4xl:text-3xl 4xl:mt-2'>Summarise and stress the importance of immediate action.</p>
      </div>
    </div>
  )
}

export default Proposaldesc;