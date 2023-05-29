import { collection, getDocs } from "@firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import db from "../firebase";
import PostCard from "../components/PostCard";
import "../styles/Posts.css";
// import AddPost from "../components/AddPost";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("default");

  useEffect(() => {
    async function fetchData() {
      try {
        const tempArr = [];
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          tempArr.push(doc);
        });

        setPosts(tempArr);
        setFiltered(tempArr);
      } catch {}
    }

    fetchData();
  }, []);

  console.log(posts);

  const postCards = filtered.map((post) => (
    <Fragment key={post.id}>
      <PostCard
        itemphoto={post.data().itemphoto}
        itemname={post.data().itemname}
        itemqty={post.data().itemqty}
        desc={post.data().desc}
        expirydate={post.data().expirydate}
        category={post.data().category}
        id={post.id}
        owner={post.data().owner}
        requestedby={post.data().collectionrequestedby}
      ></PostCard>
    </Fragment>
  ));

  return (
    <>
      <div className="container mt-5 mb-5">
        <Filter posts={posts} setFiltered={setFiltered} setActiveCategory={setActiveCategory} activeCategory={activeCategory}></Filter>
        <div className="row posts-list mt-3">{postCards}</div>
      </div>

      <Link to={"/addpost"}>
        <button
          type="button"
          className="btn btn-primary rounded-circle border circle"
        >
          <i className="bi bi-plus-lg"></i>
        </button>{" "}
      </Link>
    </>
  );
}

export default Posts;
