import React, { useState, useEffect } from "react";
import { dbService } from "fbInstance";
import Tweet from "components/Tweet";
export default function Home(props) {
  const [tweet, settweet] = useState("");
  const [tweets, settweets] = useState([]);
  const [file, setfile] = useState("");
  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snp) => {
      const nweetArray = snp.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      settweets(nweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      tweet,
      createdAt: Date.now(),
      creator: props.userObj.uid,
    });
    settweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    settweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event; //event안에서 target안으로 가서 files객체를 받아오는 것을 의미함.
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent.target.result);
      const {
        target: { result },
      } = finishedEvent;
      setfile(result);
    };
    reader.readAsDataURL(theFile);
  };
  const clearPhoto = ()=>{
    setfile('');
  }
  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="tweet" />
        {file && (
          <div>
            <img src={file} width="50px" height="50px" alt="" />
            <button onClick={clearPhoto}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {tweets.map((nweet, i) => {
          console.log(nweet);
          return (
            <>
              <Tweet
                key={nweet.id}
                tweetObj={nweet}
                isOwner={nweet.creator === props.userObj.uid}
              ></Tweet>
            </>
          );
        })}
      </div>
    </div>
  );
}
