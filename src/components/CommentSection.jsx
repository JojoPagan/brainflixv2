import axios from 'axios';
import { api_url, api_key } from '../const';
import { useState, useEffect } from 'react';
import profileImage from '../assets/images/Mohan-muruge.jpg';

import '../styles/CommentSection.scss';


const CommentContainer = ({ commentData }) => {
  if (!commentData) {
    return <main>Loading comments...</main>;
  }

  return (
    <article key={commentData.id} className="comment__card">
      <div className="comment__avatar"></div>
      <div className="comment__body">
        <p className="comment__user">{commentData.name}</p>
        <p className="comment__date">{new Date(commentData.timestamp).toLocaleDateString()}</p>
        <p className="comment__text">{commentData.comment}</p>
      </div>
    </article>
  );
};


const CommentIntake = ({ handleSubmit }) => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    handleSubmit(comment);
    event.target.reset();
  };

  return (
    <form className="comment-form" onSubmit={onSubmitHandler}>
      <div className="comment-form__avatar-wrapper">
        <img className="comment-form__avatar" src={profileImage} alt="Mohan muruge" />
      </div>
      <div className="comment-form__body">
        <label className="comment-form__label" htmlFor="comment">
          JOIN THE CONVERSATION
        </label>
        <textarea rows="3" className="comment-form__input" name="comment" placeholder="Write comment here" required />
        <button type="submit" className="comment-form__submit">
          COMMENT
        </button>
      </div>
    </form>
  );
};


const CommentSection = ({ selected, handleSubmit }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`${api_url}/videos/${selected.id}${api_key}`)
      .then(response => setComments(response.data.comments))
      .catch(error => console.log(error));
  }, [selected]);

  return (
    <section className="comment">
      <h3 className="comment__title">{comments.length} Comments</h3>
      <CommentIntake handleSubmit={handleSubmit} />
      {comments.sort((a, b) => b.timestamp - a.timestamp).map(comment => (
        <CommentContainer
          key={comment.id}
          commentData={comment}
          videoId={selected.id}
        />
      ))}
    </section>
  );
};

export default CommentSection;
