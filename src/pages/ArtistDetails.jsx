// the song details page is similar to the artist details page so what we did is copy the song details page to the artist details page

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';

const ArtistDetails = () => {
  const [songData, setsongData] = useState([]);
  const { id: artistid } = useParams();
  // const {artistdata,isFetching,isFetchingRelatedSongs,error}= useGetSongRelated({songId})    const {activeSong, isPlaying} = useSelector((state=>state.player))- if fetching using shazamcore
  console.log(songid);

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

  // if(isFetchingArtistDetails || isFetchingRelatedSongs) return <Loader title="searching for related song details/>"
  // if (error) return <Error/>
  return (
    <div className="flex flex-col">
      {/* <DetailsHeader artistId='' songData={songData}/> */}
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        {/* there will be a need to fetch for a song lyric which you do not have, to fetch, carry on with the normol process of using axios to fetch  1:50 */}
        {/* no lyrics rendered */}
      </div>
      {/* <RelatedSongs
            data={data}
            isPlaying={isPlaying}
            activeSong={activeSong}

            /> */}
      {/* there will be a need to make another api call in relation to the artist details */}
    </div>
  );
};

export default ArtistDetails;
