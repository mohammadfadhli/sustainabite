import { collection, getDocs } from "@firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import db from "../firebase";
import PostCard from "../components/PostCard";

function Posts() {
    const [posts, setPosts] = useState([]);

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
            } catch {}
        }

        fetchData();
    }, []);

    console.log(posts);

    const postCards = posts.map((post) => (
        <Fragment>
            <PostCard
                itemphoto={post.data().itemphoto}
                itemname={post.data().itemname}
                desc={post.data().desc}
                expirydate={post.data().expirydate}
                category={post.data().category}
                id={post.id}
            ></PostCard>
        </Fragment>
    ));

    return (
        <>
            <div class="container mt-5">
                <div class="row">{postCards}</div>
            </div>
        </>
    );
}

export default Posts;
