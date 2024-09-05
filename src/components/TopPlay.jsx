import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import axios from "axios";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
// import {useGetTopChartsQuery} from '../redux/services/shazamCore'
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/free-mode";
// eslint-disable-next-line import/no-cycle
import { SongDetails } from "../pages";

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  // eslint-disable-next-line no-console
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-1g cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-10 h-10 rounded-lg"
          src={song?.cover}
          alt={song.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/albums/${song.id}`}>
            <p className="text-base font-bold text-white">{song?.title}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  // there could be an error here, you might not have to fetch again
  const location = useLocation();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const divRef = useRef(null);
  const [thedata, settheData] = useState([]);
  const [theChartData, setTheChartData] = useState([]);
  const [sidebar, setSideBar] = useState(true);

  useEffect(() => {
    const hiddenRoutes = ["/top-albums", "/top-artists"]
    if (hiddenRoutes.includes(location.pathname)){
      setSideBar(false);
    } else {
      setSideBar(true);
    }
  }, [location]);

  useEffect(() => {
    axios
      .get(
        "https://utils.check-dc.com/api/proxify?url=https://api.deezer.com/chart/0"
      )
      .then((res) => {
        settheData(res.data.artists.data);
        // eslint-disable-next-line no-console
        console.log(res.data.artists.data);
        setTheChartData(res.data.albums.data);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    divRef.current.scrollIntoView({ behaviour: "smooth" });
  });
  const topPlays = thedata?.slice(0, 5);
  const topCharts = theChartData?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
    // eslint-disable-next-line no-undef
    ref.current?.pause();
    // eslint-disable-next-line no-undef
    ref.current.currentTime = 0;
  };

  const handlePlayClick = (song, i) => {
    // Set the new song as the active song
    dispatch(setActiveSong({ song, i }));
    dispatch(playPause(true));
    // eslint-disable-next-line no-undef
    ref.current.play();
  };
  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[300px] max-w-full flex flex-col"
    >
     {sidebar &&  <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
      </div>}
      {sidebar && (
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
              <Link to={`/artist/${song?.name[0].adamid}`} />
              <img
                src={song?.picture}
                alt="supposedName"
                className="rounded-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {sidebar && (
        <div className="w-full flex flex-col mt-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Albums</h2>
            <Link to="/top-albums">
              <p className="text-gray-300 text-base cursor-pointer">See more</p>
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            {topCharts?.map((song, i) => (
              <TopChartCard
                key={song.key}
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
              />
            ))}
          </div>
        </div>
      )}

      {sidebar && <SongDetails />}
    </div>
  );
};

export default TopPlay;
