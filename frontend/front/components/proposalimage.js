import React from 'react'

const Proposalimage = () => {
  return (
    <div className="flex flex-col">
      <p className="text-black text-6xl mt-7">
      Add an image
      </p>
      <p className="text-black text-2xl mt-10">
      Proposals with an image have chances of getting get more donations than proposal without a image.
      </p>
      <div className='flex justify-center mx-auto border border-dashed border-black h-[100px] w-[600px] mt-5'>
        <div className='flex justify-center my-auto mx-auto'>
        <input type="file" accept="image/*"/>
        </div>
        
      </div>
      <p className='text-black text-lg mt-6 flex mx-auto'>Image sizes of at least 1200 x 675 pixels will look good on all screens</p>
    </div>
  )
}

export default Proposalimage;