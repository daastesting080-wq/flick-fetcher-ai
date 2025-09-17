import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

const MoviePlayer: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get('movieId');
  const autoplay = queryParams.get('autoplay') === 'true';
  const dsLang = queryParams.get('ds_lang') || 'en';
  const subUrl = queryParams.get('sub_url');

  const getVidsrcUrl = () => {
    const baseUrl = `https://vidsrc.xyz/embed/movie?tmdb=${movieId}`;
    const params = new URLSearchParams();

    if (autoplay) {
      params.append('autoplay', '1');
    }

    if (dsLang) {
      params.append('ds_lang', dsLang);
    }

    if (subUrl) {
      params.append('sub_url', encodeURIComponent(subUrl));
    }

    return `${baseUrl}&${params.toString()}`;
  };

  if (!movieId) {
    return <div className="text-white text-center">Movie ID is missing. Please provide a valid movie ID.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-white text-2xl mb-4">Now Playing</h1>
      <div className="aspect-video w-full max-w-4xl">
        <ReactPlayer
          url={getVidsrcUrl()}
          controls
          playing={autoplay}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default MoviePlayer;