const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen h-full pt-[20%] px-24 absolute text-white z-20 bg-gradient-to-r from-black via-transparent to-transparent">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div>
        <button className="bg-white text-black p-4 px-12 text-lg  rounded-lg hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="bg-gray-500 mx-2 text-white p-4 px-12 text-lg bg-opacity-50 rounded-lg hover:bg-opacity-80">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
