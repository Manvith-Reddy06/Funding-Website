import Image from "next/image";
import chai from "../public/chai.png";
import coin from "../public/coin.png"

export default function Home() {
  return (
    <>
      <div>
        <div>${console.log("GitHub ID:", process.env.NEXT_PUBLIC_GITHUB_ID)}</div>
        <div className="justify-center items-center flex">
          <div className="font-bold text-5xl text-white flex justify-center flex-col h-[44vh] w-[70vw] items-center pt-5">
            <div className="flex gap-2 m-4 justify-center items-center ">
              Fund Here
              <span className=" justify-center">
                <Image
                  src={coin}
                  placeholder="blur"
                  alt=""
                  width={50}
                  height={50}
                />
              </span>
            </div>
            <p className="text-white text-lg font-thin">
              This is a website where you can donate your funds to your favorite
              streamers or to the needy- Make a useful contribution to the
              society
            </p>
          </div>
        </div>
        <div className="flex justify-center space-x-4 ">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Donate Here
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read More
          </button>
        </div>
      </div>
      <div className="h-1 bg-white opacity-10"></div>
      <div className="text-white">
        <div className="font-bold text-white justify-center items-center flex text-2xl m-8">Help Here!!</div>
        <div className="justify-around flex ">
          <div className="flex   items-center flex-col">
            <Image className="bg-slate-400 rounded-full" src={coin} placeholder="blur" alt="" width={50} height={50} />
            <div className="font-bold text-lg ">Donate Here</div>
            <div className="mb-8">Your Friends are here to help you..</div>
          </div>
          <div className="flex   items-center flex-col">
            <Image className="bg-slate-400 rounded-full" src={coin} placeholder="blur" alt="" width={50} height={50} />
            <div className="font-bold text-lg ">Donate Here</div>
            <div className="mb-8">Your Friends are here to help you..</div>
          </div>
          <div className="flex   items-center flex-col">
            <Image className="bg-slate-400 rounded-full" src={coin} placeholder="blur" alt="" width={50} height={50} />
            <div className="font-bold text-lg ">Donate Here</div>
            <div className="mb-8">Your Friends are here to help you..</div>
            </div>  
        </div>
        <div className="h-1 bg-white opacity-10"></div>
        <div className="font-bold text-2xl text-center">More About Us</div>
        <div className="flex justify-center items-center flex-col">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/BCcMhStc0PY?si=oXbVHYbniOAks3rt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        </div>
        


      </div>
    </>
  );
}
