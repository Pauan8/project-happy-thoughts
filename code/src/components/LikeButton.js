import React, { useState } from "react";

import { LIKES_URL } from "../reusable/urls";

export const LikeButton = ({ likes, id, messageList, setMessageList }) => {
  const [liked, setLiked] = useState(false);

  /*first this function checks if the state isLiked is true or false 
  (meaning - has this button already been pressed by the user?). 
  If it's false a fetch-post is executed that increases likes by one. 
  If the isLikes is already true tho - the like gets decreased by one */
  const toggleLike = (messageID) => {
    liked ? setLiked(false) : setLiked(true);

    const post = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    };

    fetch(LIKES_URL(messageID), post)
      .then((res) => res.json())
      .then((likedMessage) => {
        const newMessageList = messageList.map((message) => {
          if (message._id === likedMessage._id) {
            liked 
            ? (message.hearts -= 1) 
            : (message.hearts += 1);
          }
          return message;
        });

        setMessageList(newMessageList);
      })
      .catch((error) => console.log(error));
  };

  return (
    <button className="like-btn" onClick={() => toggleLike(id)}>
      <span
        role="img"
        /* by adding a state  to the className this element can change 
        background-color depending on if it has the class .heart-is-true or .heart-is-false */
        className={`like-btn__heart heart-is-${liked}`}
        aria-label="heart-emoji"
      >
        &#10084;&#65039;
      </span>
      <p className="like-btn__text"> x {likes}</p>
    </button>
  );
};
