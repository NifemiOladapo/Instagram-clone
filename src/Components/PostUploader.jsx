import { Button } from "@material-ui/core";
import { useContext, useState } from "react";
import { db, storage } from "../firebase";
import { AppContext } from "../App";
import firebase from "firebase/compat/app";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import classes from "../Styles/PostUploader.module.css";

const PostUploader = () => {
  const { user } = useContext(AppContext);

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

  const uploadPost = (imageUrl) => {
    console.log("Updating database...");
    db.collection("posts").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      caption,
      imageUrl,
      username: user.displayName,

    });
    setImage("");
    setCaption("");
    setProgress(0);
  };

  const handleUpload = () => {
    if (!image && !caption) {
      return alert("Please upload infos cant be left empty");
    }
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      uploadBytesResumable(imageRef, image).on(
        "state_changed",
        async (snapShot) => {
          const calculatedProgress = Math.round(
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100
          );
          setProgress(calculatedProgress);
          const imgUrl = await getDownloadURL(imageRef);
          console.log(imgUrl);
          uploadPost(imgUrl);
        },
        (error) => alert("Error getting download url", error.message)
      );
    } else {
      uploadPost("");
    }
  };

  return (
    <div className={classes.post__uploader}>
      {/* <div className="inputs__wrapper"> */}
      <progress color="red" value={progress} max={100} />
      <input
        placeholder="Place a caption ..."
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      {/* </div> */}

      <Button onClick={handleUpload}>UPLOAD</Button>
    </div>
  );
};

export default PostUploader;
