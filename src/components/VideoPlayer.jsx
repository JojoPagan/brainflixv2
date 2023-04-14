import { useEffect, useState } from 'react';
import axios from 'axios';
import { api_url, api_key } from '../const';

import '../styles/Video.scss'

const VideoPlayer = ({ selected }) => {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    axios
      .get(`${api_url}/videos/${selected.id}${api_key}`)
      .then(res => {
        setVideoData(res.data);
      })
      .catch(err => console.log(err));
  }, [selected]);

  if (!videoData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="video-player__wrapper">
        <video className="video-player__player" poster={videoData.image} controls/>
      </div>
    </>
  );
};

export default VideoPlayer;
