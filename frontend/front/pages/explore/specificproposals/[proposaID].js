import React from 'react'
import {useRouter} from"next/router";

const SpecificProposal = () => {
    const router = useRouter();
    const {proposalD} = router.query;
    
  return (
    <div className='w-screen flex h-screen'>
        <div className='mx-auto flex justify-center align-middle'>
            <p className='text-black text-8xl'>{proposalD} proposal id</p>
        </div>
    </div>
  )
}

export default SpecificProposal;