import React,{ useState, useEffect } from "react";
import axios from "axios";
import Artistcard from "./Artistcard";


const Topartist = () => {

    const [thedata, settheData] = useState([]);
    const  [isFetching , setisFetching ] = useState(true)
    // const [loading, setLoading] = useState(true);
    //const [activeSong, isPlaying] = useSelector((state) => state.player);
   

    useEffect(() => {
        axios
          .get('https://utils.check-dc.com/api/proxify?url=https://api.deezer.com/chart/0', {
            // headers : {
            //    'x-rapidapi-key' : encodeURIComponent('81acd1d9f4msh5610853c6afd749p1033e3jsndf2cdf54e689'),
            //    'x-rapidapi-host' : encodeURIComponent('shazam-core.p.rapidapi.com​') .data.albums.data
            // }
          })
          .then((res) => {
            settheData(res.data.artists.data);
            console.log(res.data.artists.data);
            setisFetching(false);
          })
          .catch((err) => console.log(err));
      }, []);

return(
    <div>
   
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
      {thedata.map((song, i) => (
        <Artistcard
          key={song.key}
          song={song}
          i={i}
          
          data={thedata}
        />
      ))}
    </div>
  </div>
)

};

export default Topartist;
