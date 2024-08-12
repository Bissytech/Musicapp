import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux"; 
import PlayPause from "./PlayPause";
import { useEffect, useRef } from "react";

import { playPause, setActiveSong } from "../redux/features/playerSlice";


const SongCard = ({ song, i ,isPlaying,activeSong,data}) => {
  const dispatch = useDispatch();
 
  const ref = useRef(null);
  


  const handlePauseClick = () =>{

   dispatch(playPause(false));   
   ref.current?.pause()
   ref.current.currentTime = 0

  };

  const handlePlayClick = (song,i) =>{
    // Set the new song as the active song
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
    ref.current.play()
  };

  useEffect(() => {
    ref.current.addEventListener('ended' , ()=>  dispatch(playPause(false)))
  
    return () => {
      ref.current.addEventListener('ended' , ()=>  dispatch(playPause(false)))
    }
  }, [])
  

 


  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-1g cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong.href === song.href
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
         >
          <PlayPause
          isPlaying ={isPlaying}
          activeSong = {activeSong}
          song={song} 
          handlePause ={handlePauseClick}
          handlePlay={()=>handlePlayClick(song,i)}
          />
           <audio
           id={`${i}`}
  src={song.attributes.previews[0].url}
  ref={ref}
/> 
        </div>
        <img src={song.attributes.artwork.url} alt="song_img" />
      </div>
      <div className="mt-4 flex flex-col"> 
<p>
 <Link to={`/songs/${song?.key}`} className="font-semibold text-1g text-white">
 {song.attributes.name}</Link>
</p>
<p className="text-sm truncate text-gray-300 mt-1">
<Link to={song.attributes.artistName ? `/artists/${song.attributes.artistName[0].adamid}` : '/top-artists'}>

 {song.attributes.artistName}</Link>
</p>
      </div>
    </div>
  );
};

export default SongCard;
