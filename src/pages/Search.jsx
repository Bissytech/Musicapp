
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";


const Search = () => {
  const [country, setCountry] = useState("");
  const  [isFetching , setisFetching ] = useState(true)
  const [loading, setLoading] = useState(true);
  //const [activeSong, isPlaying] = useSelector((state) => state.player);
  console.log(country);
  return(
      
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Chart
        
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={thedata}
          />
        ))}
      </div>
    </div>
  )
  
}

  
;

export default Search;




   





