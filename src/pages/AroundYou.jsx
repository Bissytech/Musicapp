import React, { useState, useEffect } from 'react';

import axios from 'axios';
// eslint-disable-next-line import/no-cycle, no-unused-vars
import { Error, Loader, SongCard } from '../components';

const AroundYou = () => {
  // eslint-disable-next-line no-unused-vars
  const [isFetching, setisFetching] = useState(true);

  const [country, setCountry] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  // const [activeSong, isPlaying] = useSelector((state) => state.player);
  // eslint-disable-next-line no-console
  console.log(country);

  useEffect(() => {
    axios
      .get(
        'https://geo.ipify.org/api/v2/country?apiKey=at_MsNDfKc8GeGfnaCmqq7M3iBzGEx6T&',
      )
      .then((res) => setCountry(res?.data?.location?.country))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);
  return (
    <div className="flex flex-col">
      {isFetching ? (
        <Loader title="Loading songs..." />
      ) : (
        <div>
          <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
            Around You
            <span className="font-black">{country}</span>
          </h2>
          <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            {data?.map((song, i) => (
              <SongCard
                key={song.key}
                song={song}
                i={i}
                isPlaying=        {isPlaying}
                activeSong={activeSong}
                data={thedata}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AroundYou;
