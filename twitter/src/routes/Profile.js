import React, { useState, useEffect } from "react";
import { authService, dbService, storageService } from "fbInstance";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Profile({ refreshUser, userObj }) {
  const history = useHistory();
  const [displayName, setdisplayName] = useState(userObj.displayName);
  const [file, setfile] = useState(authService.currentUser.photoURL);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creator", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(tweets.docs.map((doc) => doc.data()));
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setdisplayName(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      setfile(result);
    };
  };
  const clearPhoto = () => {
    setfile("");
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let fileUrl = "";
    if (userObj.displayName !== displayName) {
      await userObj.updateProfile({
        displayName: displayName,
      });

      refreshUser();
    }
    if (file !== "") {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(file, "data_url");
      fileUrl = await response.ref.getDownloadURL();
      await userObj.updateProfile({
        photoURL: fileUrl,
      });

      refreshUser();
    }
  };
  useEffect(() => {
    getMyTweets();
  }, []);
  return (
    <div className="container">
      <form action="" onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          onChange={onChange}
          autoFocus
          placeholder="Display name"
          value={displayName}
          className="formInput"
        />
        <label for="attach-file" className="factoryInput__label">
          <span>Add Photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input id="attach-file" type="file" style={{opacity: 0}} accept="image/*" onChange={onFileChange} className="factoryInput__label" />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <img src={file} alt="" />
      <button onClick={clearPhoto}>Clear</button>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log out</span>
    </div>
  );
}
