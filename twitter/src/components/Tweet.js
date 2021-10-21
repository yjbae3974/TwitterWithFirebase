import React, { useState } from "react";
import { dbService,storageService } from "fbInstance";
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
  const onSubmit = async (event) =>{
    event.preventDefault();
    console.log(newTweet)
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      tweet: newTweet,
    })
    setisEditing(false);
  }
  const onChange = (event)=>{
    const {target: {value}}=event;
    setnewTweet(value);
  }
  return (
    <div>
      {isEditing ? (
          <>
        <form onSubmit={onSubmit} action="">
          <input type="text" onChange={onChange} value={newTweet} />
          <input type="submit" value="edit" />
        </form>
        <button onClick={onEditClick}>cancel</button>
        </>
      ) : (
          <>
        <h4>{tweetObj.text}</h4>
        {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} width="50px" height="50px" alt="" />}
        {isOwner ? (
        <>
          <button onClick={onDeleteClick}>Delete Tweet</button>
          <button onClick={onEditClick}>Edit Tweet</button>
        </>
      ) : (
        ""
      )}
        </>
      )}

      
    </div>
  );
}
