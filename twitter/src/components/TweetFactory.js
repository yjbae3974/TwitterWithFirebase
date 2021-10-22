import React,{useState} from "react";
import { storageService, dbService } from "fbInstance";
import {v4 as uuidv4} from 'uuid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function TweetFactory({ userObj }) {
    const [tweet, settweet] = useState("");
    const [file, setfile] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let fileUrl = "";
    console.log(file);
    if (file != "") {
      const fileRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(file, "data_url");
      fileUrl = await response.ref.getDownloadURL();
    }
    console.log(fileUrl);
    const uptweet = {
      text: tweet,
      createdAt: Date.now(),
      creator: userObj.uid,
      attachmentUrl: fileUrl,
    };
    await dbService.collection("tweets").add(uptweet);
    settweet("");
    setfile("");
    // await dbService.collection("tweets").add({
    //   tweet,
    //   createdAt: Date.now(),
    //   creator: props.userObj.uid,
    // });
    // settweet("");
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
  const clearPhoto = () => {
    setfile("");
  };
  return (
    <form action="" onSubmit={onSubmit} className="factoryForm">
      <input
      className="factoryInput__input"
        value={tweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input type="file"  id="attach-file" className="factoryInput__label" accept="image/*" onChange={onFileChange} style={{
          opacity: 0,
        }} />
      <input type="submit" value="tweet" className="factoryInput__arrow" />
      {file && (
        <div className="factoryForm__attachment">
          <img src={file} alt="" />
            
            <div className="factoryForm__clear" onClick={clearPhoto}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
}
