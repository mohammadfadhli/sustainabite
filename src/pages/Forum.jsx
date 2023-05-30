import { useContext, useEffect, useState } from "react";
import MediaTemplate from "../components/MediaTemplate";
import { AuthContext } from "../auth";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import db, { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

function Forum() {
  const { currentUser } = useContext(AuthContext);
  const [forumPosts, setForumPosts] = useState([]);
  const [newPost, setNewPost] = useState(false);
  const [newPostData, setNewPostData] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");

  // get all forum posts when first rendered and when forumPosts state changes
  useEffect(() => {
    const fetchPic = async () => {
      await getDownloadURL(ref(storage, "users/" + currentUser.uid))
        .then((url) => {
          console.log("downloaded file: " + url);
          setProfilePicUrl(url);
        })
        .catch((error) => {});
    };

    async function fetchData() {
      try {
        const tempArr = [];

        const q = query(
          collection(db, "forumposts"),
          orderBy("posted_at", "desc")
        ); // get posts from db and sort by desc timestamp

        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data().profilePicUrl);
          tempArr.push(doc);
        });

        setForumPosts(tempArr);
      } catch {}
    }

    fetchData();
    fetchPic();
  }, [newPost]);

  async function addNewPost(e) {
    e.preventDefault();

    const docRef = await addDoc(collection(db, "forumposts"), {
      post: newPostData,
      owner: currentUser.uid,
      name: currentUser.displayName,
      posted_at: serverTimestamp(),
      likes: [],
      comments: [],
      profilePicUrl: profilePicUrl,
    });

    if (newPost) {
      setNewPost(false);
    } else {
      setNewPost(true);
    }

    setNewPostData("");
  }

  return (
    <>
      <div className="container">
        <form class="my-3" onSubmit={addNewPost}>
          <textarea
            class="form-control"
            placeholder="What's on your mind?"
            id="floatingTextarea"
            onChange={(e) => {
              setNewPostData(e.target.value);
            }}
            value={newPostData}
            required
          ></textarea>
          <div class="d-grid mt-3">
            <button type="submit" class="btn btn-primary">
              Post
            </button>
          </div>
        </form>
        <MediaTemplate
          forumPosts={forumPosts}
          newPost={newPost}
          setNewPost={setNewPost}
          profilePicUrl={profilePicUrl}
        ></MediaTemplate>
      </div>
    </>
  );
}

export default Forum;
