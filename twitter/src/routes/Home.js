import React, { useState, useEffect } from "react";
import { dbService,storageService } from "fbInstance";
import Tweet from "components/Tweet";

import TweetFactory from "components/TweetFactory";
export default function Home(props) {

  const [tweets, settweets] = useState([]);
  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snp) => {
      const nweetArray = snp.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      settweets(nweetArray);
    });
  }, []);


  return (
    <div className="container">
      <TweetFactory userObj={props.userObj}/>
      <div style={{ marginTop: 30 }}>
        {tweets.map((nweet, i) => {
          
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
