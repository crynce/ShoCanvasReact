import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ThumbnailComp from "./ThumbnailComp";

export default function HomeCard() {
  const navigate = useNavigate();
  const userDataImages = useSelector((state) => state.uploadData.allUploadsURL);
  function goToCanvas() {
    navigate("/Home/canvas");
  }
  function goToMyUploads() {
    navigate("/uploads");
  }
  return (
    <div className="min-h-[85vh] w-[98%] mx-auto my-4 border-4 border-white shadow-[0_0_30px_10px_rgba(255,255,255,0.5)] flex flex-col gap-5 p-5 font-bitcount">
      <div className="flex gap-5 flex-wrap justify-around mt-5">
        <button
          className="px-6 py-2 bg-white/5 text-white border border-black rounded-3xl tracking-wider uppercase text-base transition-all duration-200 hover:bg-white hover:border-black/77 hover:text-black active:scale-95"
          onClick={goToCanvas}
        >
          Draw
        </button>
        <button
          className="px-6 py-2 bg-white/5 text-white border border-black rounded-3xl tracking-wider uppercase text-base transition-all duration-200 hover:bg-white hover:border-black/77 hover:text-black active:scale-95"
          onClick={goToMyUploads}
        >
          My Uploads
        </button>
      </div>
      <div>
        <div className="text-lg font-semibold text-white mb-4">
          Recent Uploads
        </div>
        <div className="flex gap-5 p-5 flex-wrap justify-around">
          {userDataImages.map((obj) => {
            return <ThumbnailComp srcURL={Object.values(obj)[0]?.secure_id} />;
          })}
        </div>
      </div>
    </div>
  );
}
