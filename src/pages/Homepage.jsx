import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import VideoPlayer from "../components/VideoPlayer";
import VideoList from "../components/VideoSelector";
import VideoDetail from "../components/VideoDescription";
import Comment from "../components/CommentSection";
import { api_url, api_key } from "../const";

import "../styles/HomePage.scss";

const HomePage = () => {
  const [videos, setVideos] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${api_url}/videos${api_key}`)
      .then((res) => {
        setVideos(res.data);
        const defaultSelectedVideo = id ? res.data.find((video) => video.id === id) : res.data[0];
        setSelectedVideo(defaultSelectedVideo);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCommentText = event.target.comment.value;
    const userName = "Jo P";
    axios
      .post(`${api_url}/videos/${selectedVideo.id}/comments${api_key}`, {
        name: userName,
        comment: newCommentText,
      })
      .then((res) => {
        setSelectedVideo({
          ...selectedVideo,
          comments: [res.data, ...selectedVideo.comments],
        });
      })
      .catch((err) => console.log(err));
    event.target.reset();
  };

  const handleDelete = (commentId) => {
    axios
      .delete(`${api_url}/videos/${selectedVideo.id}/comments/${commentId}${api_key}`)
      .then((res) => {
        const updatedComments = selectedVideo.comments.filter(
          (comment) => comment.id !== res.data.id
        );
        setSelectedVideo({ ...selectedVideo, comments: updatedComments });
      })
      .catch((err) => console.log(err));
  };

  return selectedVideo ? (
    <main className="main">
      <section className="main__hero">
        <VideoPlayer selected={selectedVideo} />
      </section>
      <section className="main__body">
        <div className="main__body-left">
          <VideoDetail selected={selectedVideo} />
          <Comment
            selected={selectedVideo}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
          />
        </div>
        <div className="main__body-right">
          <VideoList videoData={videos} selected={selectedVideo} />
        </div>
      </section>
    </main>
  ) : (
    <p>Loading...</p>
  );
};

export default HomePage;
