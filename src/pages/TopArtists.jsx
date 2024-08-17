import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";


const TopArtists = () => {

    const [country, setCountry] = useState("");
    const  [isFetching , setisFetching ] = useState(true)
    const [loading, setLoading] = useState(true);
    //const [activeSong, isPlaying] = useSelector((state) => state.player);
    console.log(country);

return(
    <div className="flex- flex-wrap sm:justify-start justify-center gap-8">
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top Artists</h2>
    </div>
)

};

export default TopArtists;
