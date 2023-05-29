import { collection, getDocs } from "@firebase/firestore";
import { Fragment, useContext, useEffect, useState } from "react";
import db from "../firebase";
import PostCard from "../components/PostCard";

// import AddPost from "../components/AddPost";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";
import { AuthContext } from "../auth";
import "../styles/Posts.css";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeCategory, setActiveCategory] = useState("default");
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        async function fetchData() {
            try {
                const tempArr = [];
                const querySnapshot = await getDocs(collection(db, "posts"));
                querySnapshot.forEach((doc) => {

                    tempArr.push(doc);
                });

                setPosts(tempArr);
                setFiltered(tempArr);

            } catch {}
        }

        fetchData();
    }, []);

    const postCards = filtered.map((post) => (
        <Fragment key={post.id}>
            <PostCard
                itemphoto={post.data().itemphoto}
                itemname={post.data().itemname}
                itemqty={post.data().itemqty}
                desc={post.data().desc}
                expirydate={post.data().expirydate}
                category={post.data().category}
                address={post.data().address}
                postalCode={post.data().postalCode}
                id={post.id}
                owner={post.data().owner}
                requestedby={post.data().collectionrequestedby}
            ></PostCard>
        </Fragment>
    ));

    function IsLoggedIn() {
        if (currentUser) {
            return (
                <>
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
    }

    return (
        <>
            <div className="container mt-5 mb-5">
                <h4 class="text-center mb-4">Share excess food with your neighbours!</h4>
                <Filter
                    posts={posts}
                    setFiltered={setFiltered}
                    setActiveCategory={setActiveCategory}
                    activeCategory={activeCategory}
                ></Filter>
                <div>
                    <div className="row mt-3 g-3">{postCards}</div>
                </div>
            </div>
            <IsLoggedIn></IsLoggedIn>
        </>
    );
}

export default Posts;
