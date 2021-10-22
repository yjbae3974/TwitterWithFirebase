import React, { useState } from "react";
import { dbService, storageService } from "fbInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export default function Tweet({ tweetObj, isOwner }) {
  const [isEditing, setisEditing] = useState(false);
  const [newTweet, setnewTweet] = useState(tweetObj.tweet);
  const fileUrl = tweetObj.attachmentUrl;
  const onDeleteClick = async () => {
    const ok = window.confirm("Are You Sure you want to delete this tweet?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(fileUrl).delete();
    }
  };
  const onEditClick = () => {
    setisEditing((prev) => !prev);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(newTweet);
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      tweet: newTweet,
    });
    setisEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setnewTweet(value);
  };
  return (
    <div className="nweet">
      {isEditing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              onChange={onChange}
              value={newTweet}
              required
              autoFocus
              className="formInput"
            />
            <input type="submit" value="edit" className="formBtn" />
          </form>
          <button onClick={onEditClick} className="formBtn cancelBtn">
            cancel
          </button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <img src={tweetObj.attachmentUrl} alt="" />
          )}
          {isOwner ? (
            <div className="nweet__actions">
              <button onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={onEditClick}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}
