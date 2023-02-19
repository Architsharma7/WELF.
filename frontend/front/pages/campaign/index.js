import React, {useEffect, useState} from "react";
import Link from "next/link";

const Campaign = () => {

  const [data, setData] = useState();

  const fetchData = async( ) => {
    return await fetch("https://bafkreic5sd2ft3z5ianuf5iqz2rt4d27tmorlau3xaajup6c3ria7ykg2q.ipfs.w3s.link/")
    .then((response) => response.json()).then((value) => setData(value));
  }  
  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className="w-screen">
      <div className="w-4/5 flex justify-center mx-auto flex-col items-center">
        <p className="text-3xl mt-10">Campaigns</p>
        <div className="grid lg:grid-cols-3 grid-cols-1 mt-20 w-full items-center text-center gap-x-6 gap-y-10">
            <Link href="/">
          <div className="flex flex-col items-center bg-slate-100 shadow-xl border-black border rounded-xl px-4 py-3 h-[450px]">
            <div className="h-[270px]">
              {/* {data ? <img src={URL.createObjectURL(data.images)} alt=""/> : <p>Image Not Found</p>} */}
              <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/C706/production/_128605905_1d1fa2c80e3674572eb5b6bd6df8b395a897778b553_903_4644_26124644x2612.jpg" alt="earthqauke" className="w-[325px] 3.5xl:w-[450px] 4xl:w-[600px] h-[240px] object-fill"/>
            </div>
            <div className="text-center mx-auto">
            {data ? <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2 text-2xl">{data.title}</p> : <p>undefined</p>}
            </div>
            <div className="text-center">
              <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2 text-sm">by who</p>
            </div>
            <div className="text-center mt-2">
            {data ? <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2">{data.desc}</p> : <p>undefined</p>}
            </div>
            <div className="text-center mt-2">
              <p>Amount raised</p>
              {data ? <p className="text-ellipsis overflow-hidden">{data.donation}</p> : <p>undefined</p>}
            </div>
          </div>
          </Link>
          <Link href="/">
          <div className="flex flex-col items-center bg-slate-100 shadow-xl border-black border rounded-xl px-4 py-3 h-[450px]">
            <div className="h-[270px]">
              {/* {data ? <img src={URL.createObjectURL(data.images)} alt=""/> : <p>Image Not Found</p>} */}
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbrIBxJ3gE5QChBu2E0BWrI2aNCbMSx1775g&usqp=CAU" alt="earthqauke" className="w-[325px] 3.5xl:w-[450px] 4xl:w-[600px] h-[240px] object-fill"/>
            </div>
            <div className="text-center mx-auto">
            {data ? <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2 text-2xl">{data.title}</p> : <p>undefined</p>}
            </div>
            <div className="text-center">
              <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2 text-sm">by who</p>
            </div>
            <div className="text-center mt-2">
            {data ? <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2">{data.desc}</p> : <p>undefined</p>}
            </div>
            <div className="text-center mt-2">
              <p>Amount raised</p>
              {data ? <p className="text-ellipsis overflow-hidden">{data.donation}</p> : <p>undefined</p>}
            </div>
          </div>
          </Link>
          <Link href="/">
          <div className="flex flex-col items-center bg-slate-100 shadow-xl border-black border rounded-xl px-4 py-3 h-[450px]">
            <div className="h-[270px]">
              {/* {data ? <img src={URL.createObjectURL(data.images)} alt=""/> : <p>Image Not Found</p>} */}
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbrIBxJ3gE5QChBu2E0BWrI2aNCbMSx1775g&usqp=CAU" alt="earthqauke" className="w-[325px] h-[240px] 3.5xl:w-[450px] 4xl:w-[600px] object-fill"/>
            </div>
            <div className="text-center mx-auto">
            {data ? <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2 text-2xl">{data.title}</p> : <p>undefined</p>}
            </div>
            <div className="text-center">
              <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2 text-sm">by who</p>
            </div>
            <div className="text-center mt-2">
            {data ? <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2">{data.desc}</p> : <p>undefined</p>}
            </div>
            <div className="text-center mt-2">
              <p>Amount raised</p>
              {data ? <p className="text-ellipsis overflow-hidden">{data.donation}</p> : <p>undefined</p>}
            </div>
          </div>
          </Link>
          <Link href="/">
          <div className="flex flex-col items-center bg-slate-100 shadow-xl border-black border rounded-xl px-4 py-3 h-[450px]">
            <div className="h-[270px]">
              {/* {data ? <img src={URL.createObjectURL(data.images)} alt=""/> : <p>Image Not Found</p>} */}
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbrIBxJ3gE5QChBu2E0BWrI2aNCbMSx1775g&usqp=CAU" alt="earthqauke" className="w-[325px] 3.5xl:w-[450px] 4xl:w-[600px] h-[240px] object-fill"/>
            </div>
            <div className="text-center mx-auto">
            {data ? <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2 text-2xl">{data.title}</p> : <p>undefined</p>}
            </div>
            <div className="text-center">
              <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2 text-sm">by who</p>
            </div>
            <div className="text-center mt-2">
            {data ? <p className="text-ellipsis lg:w-[300px] 3.5xl:w-[450px] 4xl:w-[600px] line-clamp-2">{data.desc}</p> : <p>undefined</p>}
            </div>
            <div className="text-center mt-2">
              <p>Amount raised</p>
              {data ? <p className="text-ellipsis overflow-hidden">{data.donation}</p> : <p>undefined</p>}
            </div>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Campaign;