import { Error, Loader, SongCard } from "../components";
// import { useGetTopChartsQuery } from "../redux/sevices/shazamCore";
import { genres } from "../assets/constants";
import { useDispatch, useSelector } from "react-redux";
import {selectGenreListId} from '../redux/features/playerSlice'
 import { useState , useEffect} from "react";
import axios from "axios";


const Discover = () => {
  const dispatch = useDispatch()
  const {activeSong,isPlaying, genreListId} = useSelector((state)=>state.player);
  // const {data,isFetching,error}= useGetTopChartsQuery();
  let [thedata , settheData ] = useState([])
  let [isFetching , setisFetching ] = useState(true)


  // if (error) {
  //   return <Error />;  // Handle any errors that occur
  // }
//https://robo-music-api.onrender.com/music/my-api
//https://shazam-core.p.rapidapi.com/v1/charts/world?country_code=DZ

//if (isFetching) return <Loader title='Loading songs...'/>
//if (error) return <Error/>

const genreTitle = genres.find(({value})=> value === genreListId)?.title;

  console.log(genres);
  //const genreTitle = "Pop"; 
  
  
 

  useEffect(() => {
    axios.get('https://robo-music-api.onrender.com/music/my-api' , {
      // headers : { 
      //    'x-rapidapi-key' : encodeURIComponent('81acd1d9f4msh5610853c6afd749p1033e3jsndf2cdf54e689'),
      //    'x-rapidapi-host' : encodeURIComponent('shazam-core.p.rapidapi.com​')
      // }
    }).
    then((res)=>{
      settheData(res.data) 
      console.log(res.data)
      setisFetching(false)
    } 
    ).
    catch((err)=> console.log(err)
      )
  }, [])
 
  // if (isFetching) {
  //   return  
  // }

  return (
    <div className="flex flex-col">
      
      {isFetching
        ? <Loader title="Loading songs..." />
        : 
        <div>
          <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
            <h2 className="font-bold text-3xl text-white text-left">
              Discover {genreTitle}
            </h2>
            <select
            value={genreListId || 'pop'}
              onChange={(e) => dispatch(selectGenreListId(e.target.value))}
           
              className="bg-black text-gray-300 p-3 text-sm rounded-1g outline-none sm:mt-0 mt-5"
            >
              {genres.map((genre) => (
                <option key={genre.value} value={genre.value}>
                  {genre.title}
                </option>
              
              ))}
            </select>
          </div>
          <div className="flex flex-wrap sm:justify-start justify-center gap-8">

            {thedata.map((song, i) => (

              <SongCard 
              key={song.key}
               song={song} 
               i={i}
               isPlaying={isPlaying}
               activeSong = {activeSong}
               data ={thedata}
               
  
               />
            ))}
          </div>
        </div>
      }
      
      
    </div>
  );
};

export default Discover;
