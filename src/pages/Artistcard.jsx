import { Link } from "react-router-dom";
import React from "react";
import { Loader } from "../components";

const Artistcard = ({ song, key, i, data }) => {
  return (
    <div className="flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-1g cursor-pointer">
      <div className="relative w-full h-40 group">
        <img src={song.picture_big} alt="song_img" />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-1g text-white">{song.name}</p>
        {/* <p className="text-sm truncate text-gray-300 mt-1">
          {song.type}
        </p> */}
      </div>
    </div>
  );
};

export default Artistcard;
