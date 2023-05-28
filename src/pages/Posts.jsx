import { collection, getDocs } from "@firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import db from "../firebase";
import PostCard from "../components/PostCard";
import "../styles/Posts.css";
// import AddPost from "../components/AddPost";
import { Link } from "react-router-dom";
import Post from "../pages/Post.jsx";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const tempArr = [];
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        tempArr.push(doc);
      });

      setPosts(tempArr);
    } catch {}

    console.log(posts);
    console.log(setPosts)

    // const postCards = posts.map((post) => (
    //   <>
    //     <PostCard
    //       itemphoto={post.data().itemphoto}
    //       itemname={post.data().itemname}
    //       desc={post.data().desc}
    //       expirydate={post.data().expirydate}
    //       category={post.data().category}
    //       id={post.id}
    //       owner={post.data().owner}
    //       requestedby={post.data().collectionrequestedby}
    //     ></PostCard>
    //   </>
    // ));

    return (
      <>
        {/* <div class="container mt-5">
        <div class="row">{postCards}</div>
      </div> */}
        <div className="posts-list">
          {posts.map((post) => {
            return <Post />;
          })}
        </div>

        <Link to={"/addpost"}>
          <button
            type="button"
            class="btn btn-primary rounded-circle border circle"
          >
            <i class="bi bi-plus-lg"></i>
          </button>{" "}
        </Link>
      </>
    );
  };
}

export default Posts;
