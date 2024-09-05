import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PlayPause from "./PlayPause";
import { useEffect, useRef } from "react";
import { playPause, setActiveSong, setAudio } from "../redux/features/playerSlice";

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const handlePauseClick = () =>{
    dispatch(playPause(false));
    ref?.current?.pause();
  };

  // eslint-disable-next-line no-shadow
  const handlePlayClick = (song, i) => {
    // Set the new song as the active song
    dispatch(setActiveSong({ song, data, i }));

    // Store the current audio reference in Redux
    dispatch(setAudio(ref?.current));

    dispatch(playPause(true));
    ref?.current.play();
  };

  useEffect(() => {
    const handleEnded = () => dispatch(playPause(false));
    ref?.current?.addEventListener("ended", handleEnded);

    return () => {
      ref?.current?.removeEventListener("ended", handleEnded);
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-1g cursor-pointer">
      <div className="relative w-full h-40 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.id === song.id
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick(song, i)}
          />
          {/* Audio element for playback */}
          <audio id={`${i}`} src={song?.preview} ref={ref} />
        </div>
        <img src={song.album.cover_big} alt="song_img" />
      </div>
      <div className="mt-4 flex flex-col">
        <p>
          <Link
            to={`/songs/${song?.key}`}
            className="font-semibold text-1g text-white"
          >
            {song.title}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.artist.name && Array.isArray(song.artist.name)
                ? `/artists/${song.artist.name[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.artist.name}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;

