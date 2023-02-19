import React from "react"
import { useRouter } from "next/router";
 const ThankYou=() => {
    const router = useRouter();
    return (
      <div className='w-screen h-screen'>
        <div className="flex justify-center mt-20 mx-auto my-auto">
            <div className="bg-white w-[700px] h-[400px] flex flex-col text-center shadow-xl">
                <p className="text-4xl text-blue-500">Thank You !</p>
                <button className="text-xl" onClick={() => router.push("/")}>Go back home</button>
            </div>
        </div>
      </div>
    )
  }

  export default ThankYou;