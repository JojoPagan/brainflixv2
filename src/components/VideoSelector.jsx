import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VideoSelector.scss';


const VideoSelectorContainer = ({ videoData }) => {
  return (
    <article className="video-selector-container">
      <img className="video-selector-container__image" src={videoData.image} alt={videoData.title} />
      <div className="video-selector-container__text-wrapper">
        <p className="video-selector-container__title">{videoData.title}</p>
        <p className="video-selector-container__creator">{videoData.channel}</p>
      </div>
    </article>
  );
};


const VideoSelector = ({ videoData, selected }) => {
  const filteredVideoData = videoData.filter(video => video.id !== selected.id);

  return (
    <section className="video-selector">
      <h2 className="video-selector__title">NEXT VIDEOS</h2>
      {filteredVideoData.map(video => (
        <Link className="video-selector__link" to={`/videos/${video.id}`} key={video.id}>
          <VideoSelectorContainer videoData={video} />
        </Link>
      ))}
    </section>
  );
};

export default VideoSelector;
