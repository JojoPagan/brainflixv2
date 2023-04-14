import { useEffect, useState } from 'react';
import axios from 'axios';
import { api_url, api_key } from '../const';
import ViewIcon from '../assets/images/views.svg';
import LikeIcon from '../assets/images/likes.svg';

import '../styles/Video.scss';

const VideoDescription = ({ selected }) => {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    axios
      .get(`${api_url}/videos/${selected.id}${api_key}`)
      .then((res) => setVideoData(res.data))
      .catch((err) => console.log(err));
  }, [selected.id]);

  if (!videoData) {
    return <p>Loading...</p>;
  }

  return (
    <section className="video-description">
      <h1 className="video-description__title">{videoData.title}</h1>
      <article className="video-description__detail">
        <div className="video-description__subtitle">
          <h2 className="video-description__creator">By {videoData.channel}</h2>
          <p className="video-description__date">
            {new Date(videoData.timestamp).toLocaleDateString()}
          </p>
        </div>
        <div className="video-description__stats-wrapper">
          <img className="video-description__view-icon" src={ViewIcon} alt="view icon" />
          <p className="video-description__view-num">{videoData.views}</p>
          <img className="video-description__like-icon" src={LikeIcon} alt="like icon" />
          <p className="video-description__like-num">{videoData.likes}</p>
        </div>
      </article>
      <p className="video-description__text">{videoData.description}</p>
    </section>
  );
};

export default VideoDescription;
