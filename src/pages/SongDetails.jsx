import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';

const SongDetails = () => {
  const [songData, setsongData] = useState([]);
  const { id: songid } = useParams();
  // const {data,isFetching,isFetchingRelatedSongs,error}= useGetSongRelated({songId})    const {activeSong, isPlaying} = useSelector((state=>state.player))- if fetching using shazamcore
  console.log(songid);

  // const handlePauseClick = () =>{

  //     dispatch(playPause(false));
  //     ref.current?.pause()
  //     ref.current.currentTime = 0

  //    };

  //    const handlePlayClick = (song,i) =>{
  //      // Set the new song as the active song
  //      dispatch(setActiveSong({ song, data, i }));
  //      dispatch(playPause(true));
  //      ref.current.play()
  //    };

  useEffect(() => {
    axios
      .get('https://robo-music-api.onrender.com/music/my-api', {
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

  // if(isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="searching for related song details/>"
  // if (error) return <Error/>
  return (
    <div className="flex flex-col">
      {/* <DetailsHeader artistId='' songData={songData}/> */}
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        {/* there will be a need to fetch for a song lyric which you do not have, to fetch, carry on with the normol process of using axios to fetch  1:50 */}
        <div className="mt-5">
          {/* map the lyrics in this section */}
          {songData?.id === 'LYRICS' ? (
            songData?.section[1].text.map((Line, i) => (
              <p className="text-gray-400 text-base my-1">{Line}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found!
            </p>
          )}
        </div>
      </div>
      {/* <RelatedSongs
            data={data}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}

            /> */}
      {/* there will be a need to make another api call in relation to the artist details */}
    </div>
  );
};

export default SongDetails;
