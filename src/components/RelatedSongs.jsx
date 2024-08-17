import songBar from './SongBar'

const RelatedSongs = ({data,isPlaying,activeSong,handlePauseClick,handlePlayClick, artistId}) => (
  
  <div className='flex flex-col'> 
    <h1 className='font-bold text-3xl text-white'>Related Songs:</h1>
    <div className='mt-6 w-full flex flex-col'>
{data.map((song,i)=>(
<songBar
key={`${song.key}-{${artistId}}`}
artistId={artistId}
isPlaying={isPlaying}
activeSong={activeSong}
handlePause={handlePauseClick}
handlePlay={handlePlayClick}


/>


))}

    </div>
  </div>
);

export default RelatedSongs;
