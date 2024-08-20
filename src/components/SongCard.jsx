/* eslint-disable jsx-a11y/media-has-caption */
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import PlayPause from './PlayPause';

import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const handlePauseClick = () => {
    dispatch(playPause(false));
    ref.current?.pause();
    // ref.current.currentTime = 0;
  };

  // eslint-disable-next-line no-shadow
  const handlePlayClick = (song, i) => {
    // Set the new song as the active song
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
    ref.current.play();
  };

  useEffect(() => {
    ref.current.addEventListener('ended', () => dispatch(playPause(false)));

    return () => {
      ref.current.addEventListener('ended', () => dispatch(playPause(false)));
    };
  }, []);

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-1g cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong.artistName === song.artistName
              ? 'flex bg-black bg-opacity-70'
              : 'hidden'
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick(song, i)}
          />
          <audio id={`${i}`} src={song?.songUrl} ref={ref} />

        </div>
        <img src={song.songImage} alt="song_img" />
      </div>
      <div className="mt-4 flex flex-col">
        <p>
          <Link
            to={`/songs/${song?.key}`}
            className="font-semibold text-1g text-white"
          >
            {song.artistName}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.artistName
                ? `/artists/${song.artistName[0].adamid}`
                : '/top-artists'
            }
          >
            {song.artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
