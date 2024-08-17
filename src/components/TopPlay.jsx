import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
//import {useGetTopChartsQuery} from '../redux/services/shazamCore'
import axios from "axios";
import "swiper/css";
import "swiper/css/free-mode";
import { SongDetails } from "../pages";

const TopChartCard = ({ song, i, isPlaying,activeSong,handlePauseClick,handlePlayClick }) => {
  console.log(song);
  return(
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-1g cursor-pointer mb-2">
    <h3 className="fot-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-10 h-10 rounded-lg"
        src={song?.songImage}
        alt={song.artistName}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-xl font-bold text-white">{song?.albumName}</p>
        </Link>
        <Link to={`/artist/${song?.artistName[0].adamid}`}>
          <p className="text-ase text-gray text-white mt-1">
            {song?.artistName}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
    isPlaying={isPlaying}
    activeSong={activeSong}
    song={song}
    handlePause={handlePauseClick}
    handlePlay={()=>handlePlayClick(song,i)}
    />
  </div>

  );

 
  
};

const TopPlay = () => {
  const dispatch = useDispatch();
  // there could be an error here, you might not have to fetch again

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const divRef = useRef(null);
  let [thedata, settheData] = useState([]);

  useEffect(() => {
    axios
      .get("https://robo-music-api.onrender.com/music/my-api", {
        // headers : {
        //   'x-rapidapi-key' : encodeURIComponent('81acd1d9f4msh5610853c6afd749p1033e3jsndf2cdf54e689'),
        //   'x-rapidapi-host' : encodeURIComponent('shazam-core.p.rapidapi.com​')
        // }
      })
      .then((res) => {
        settheData(res.data);
        console.log(res.data);
        setisFetching(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    divRef.current.scrollIntoView({ behaviour: "smooth" });
  });
  const topPlays = thedata?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
    ref.current?.pause();
    ref.current.currentTime = 0;
  };

  const handlePlayClick = (song, i) => {
    // Set the new song as the active song
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
    ref.current.play();
  };
  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[300px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard key={song.key} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} 
            handlePlayClick={handlePlayClick}/>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className="mt-4"
      >
        {topPlays?.map((song, i) => (
          <SwiperSlide
            key={song?.key}
            style={{ width: "25%", height: "auto" }}
            className="shadow-lg rounded-full animate-slideright"
          >
            <Link to={`/artist/${song?.artistName[0].adamid}`}></Link>
            <img
              src={song?.songImage}
              alt="supposedName"
              className="rounded-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <SongDetails/>
    </div>
  
  );
};


export default TopPlay;
