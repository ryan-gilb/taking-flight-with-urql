import React, { useState } from 'react';
import { useMutation } from 'urql';

import Heart from './Heart';

const Thread = ({ id, title, likesNumber }) => {
  const [liked, setLiked] = useState(false);

  const [, likeThread] = useMutation(`
    mutation LikeThread($threadId: ID!) {
      likeThread(threadId: $threadId) {
        id
      }
    }
  `);

  const handleLike = () => {
    return likeThread({ threadId: id }).then(response => {
      if (response.error) {
        alert(response.error);
        return response.error;
      }
    });
  };

  return (
    <div className="Thread">
      <span>{title}</span>
      <button
        className="Heart"
        onClick={() => handleLike().then(res => res || setLiked(true))}
      >
        <Heart liked={liked} />
      </button>
      <span className="LikesNumber">{likesNumber}</span>
    </div>
  );
};

export default Thread;
