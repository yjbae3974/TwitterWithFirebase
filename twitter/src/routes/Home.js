import React, { useState, useEffect } from "react";
import { dbService } from "fbInstance";
import Tweet from "components/Tweet";
export default function Home(props) {
  const [tweet, settweet] = useState("");
  const [tweets, settweets] = useState([]);

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
        <input type="submit" value="tweet" />
      </form>
      <div>
        {tweets.map((nweet, i) => {
            console.log(nweet)
          return (
            <>
              <Tweet key={nweet.id} tweetObj={nweet} isOwner={nweet.creator === props.userObj.uid}></Tweet>
            </>
          );
        })}
      </div>
    </div>
  );
}
