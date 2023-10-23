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
import "../Styles/PostUploader.css";

const PostUploader = () => {
  const { user } = useContext(AppContext);

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

  const uploadPost = (imageUrl) => {
    db.collection("posts").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      caption,
      imageUrl,
      username: user.displayName,
    });
    setImage(null);
    setCaption("");
  };

  const handleUpload = () => {
    if (!image && !caption) {
      return alert("Please upload infos cant be left empty");
    }
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      uploadBytesResumable(imageRef, image).on(
        "state_changed",
        (snapShot) => {
          const calculatedProgress = Math.round(
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100
          );
          setProgress(calculatedProgress);
          getDownloadURL(imageRef).then((imgUrl) => {
            console.log(imgUrl);
            uploadPost(imgUrl);
          });
        },
        (error) => alert("Error getting download url",error.message)
      );
    } else {
      uploadPost("");
    }
  };

  return (
    <div className="post__uploader">
      <div className="inputs__wrapper">
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
      </div>

      <Button onClick={handleUpload}>UPLOAD</Button>
    </div>
  );
};

export default PostUploader;
