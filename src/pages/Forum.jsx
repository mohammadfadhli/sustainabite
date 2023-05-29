import { useContext, useEffect, useState } from "react";
import MediaTemplate from "../components/MediaTemplate";
import { AuthContext } from "../auth";
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import db from "../firebase";

function Forum() {
    const { currentUser } = useContext(AuthContext);
    const [forumPosts, setForumPosts] = useState([]);
    const [newPost, setNewPost] = useState(false);
    const [newPostData, setNewPostData] = useState("");

    // get all forum posts when first rendered and when forumPosts state changes
    useEffect(() => {
        async function fetchData() {
            try {
                const tempArr = [];

                const q = query(collection(db, "forumposts"), orderBy('posted_at', 'desc')); // get posts from db and sort by desc timestamp

                const querySnapshot = await getDocs(
                    q
                );
                // const querySnapshot = await getDocs(
                //     collection(db, "forumposts")
                // );
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    tempArr.push(doc);
                });

                setForumPosts(tempArr);
            } catch {}
        }

        fetchData();
    }, [newPost]);

    async function addNewPost(e) {
        e.preventDefault();

        const docRef = await addDoc(collection(db, "forumposts"), {
            post: newPostData,
            owner: currentUser.uid,
            name: currentUser.displayName,
            posted_at: serverTimestamp(),
            likes: [],
            comments: []
        });

        if(newPost)
        {
            setNewPost(false)
        }
        else
        {
            setNewPost(true)
        }
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
                        required
                    ></textarea>
                    <div class="d-grid mt-3">
                        <button type="submit" class="btn btn-primary">
                            Post
                        </button>
                    </div>
                </form>
                <MediaTemplate forumPosts={forumPosts} newPost={newPost} setNewPost={setNewPost}></MediaTemplate>
            </div>
        </>
    );
}

export default Forum;
