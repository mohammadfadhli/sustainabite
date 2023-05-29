import { Fragment, useContext, useEffect, useState, memo } from "react";
import placeholderimage from "../assets/placeholder-image.png";
import pp from "../assets/pp.png";
import {
    FieldValue,
    Timestamp,
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    increment,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import db from "../firebase";
import { AuthContext } from "../auth";

function MediaTemplate(props) {
    const [comment, setComment] = useState("");
    const { currentUser } = useContext(AuthContext);
    const [checked, setChecked] = useState()

    async function addComment(e) {
        e.preventDefault();

        console.log(e.target.id);

        const commented_at = Timestamp.now();

        const docRef = await updateDoc(doc(db, `forumposts/${e.target.id}`), {
            comments: arrayUnion({
                comment: comment,
                commenter: currentUser.displayName,
                commented_at: commented_at,
            }),
        });

        setComment("");

        if (props.newPost) {
            props.setNewPost(false);
        } else {
            props.setNewPost(true);
        }
    }

    function GetComments(c) {
        const commentsCards = c.allcomments.map((comment) => (
            <Fragment>
                <div className="col">
                    <div className="card border-0">
                        <div class="d-flex align-items-center ">
                            <div class="flex-shrink-0">
                                <div class="container my-2">
                                    <img
                                        class="rounded"
                                        src={pp}
                                        style={{ width: 60 }}
                                    ></img>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-1 mt-3">
                                <h5>{comment.commenter}</h5>
                                <PostDate
                                    postdate={comment.commented_at}
                                ></PostDate>
                                {/* <p>{comment.comment}</p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-3">
                    <p>{comment.comment}</p>
                </div>
            </Fragment>
        ));

        return commentsCards;
    }

    function PostDate(props) {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const finaldate = props.postdate.toDate();
        const hour = finaldate.getHours().toString().padStart(2, "0");
        const min = finaldate.getMinutes().toString().padStart(2, "0");
        const sec = finaldate.getSeconds().toString().padStart(2, "0");
        const day = finaldate.getDay();
        const month = finaldate.getMonth();
        const year = finaldate.getFullYear();

        return (
            <p className="">{`${day} ${monthNames[month]} ${year} ${hour}:${min}:${sec}`}</p>
        );
    }

    // Increase likes counter based on checkbox
    async function checkLike(like) {
        if (like.target.checked) {
            const docRef = await updateDoc(
                doc(db, `forumposts/${like.target.id}`),
                {
                    likes: arrayUnion(currentUser.uid),
                }
            );
        } else if (!like.target.checked) {
            const docRef = await updateDoc(
                doc(db, `forumposts/${like.target.id}`),
                {
                    likes: arrayRemove(currentUser.uid),
                }
            );
        }

        if (props.newPost) {
            props.setNewPost(false);
        } else {
            props.setNewPost(true);
        }
    }

    // function LikeCheckbox(props) {

    //     if(props.likes.includes(currentUser.uid))
    //     {
    //         setChecked(true)
    //     }
    //     else
    //     {
    //         setChecked(false)
    //     }

    //     return (
    //         <>
    //             <div class="px-3">
    //                 <input
    //                     class="form-check-input"
    //                     type="checkbox"
    //                     id={props.id}
    //                     onChange={(e) => checkLike(e)}
    //                     checked={checked}
    //                 />
    //                 <h6>{props.likes.length} people likes this.</h6>
    //             </div>
    //         </>
    //     );
    // }

    const postCards = props.forumPosts.map((post) => (
        <Fragment key={post.id}>
            <div class="border border-dark pb-3 rounded-3 mb-3">
                {/* Top part */}
                <div className="col mb-3">
                    <div className="card border-0">
                        <div class="d-flex align-items-center ">
                            <div class="flex-shrink-0">
                                <div class="container my-2">
                                    <img
                                        class="rounded"
                                        src={pp}
                                        style={{ width: 60 }}
                                    ></img>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-1 mt-3">
                                <h5>{post.data().name}</h5>
                                <PostDate
                                    postdate={post.data().posted_at}
                                ></PostDate>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom Part */}
                <div class="px-3">
                    <p>{post.data().post}</p>
                </div>
                <div class="px-3">
                    {/* <input
                        class="form-check-input"
                        type="checkbox"
                        id={post.id}
                        onChange={(e) => checkLike(e)}
                    /> */}
                    <button type="button" id={post.id} class="btn btn-primary" onClick={checkLike}>Like</button>
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                    <h6>{post.data().likes}</h6>
                </div>
                {/* <LikeCheckbox id={post.id} likes={post.data().likes}></LikeCheckbox> */}
                {/* comments section */}
                <div class="px-3 border-top">
                    <GetComments
                        allcomments={post.data().comments}
                    ></GetComments>
                    <form onSubmit={addComment} id={post.id}>
                        <textarea
                            // type="textarea"
                            class="form-control mb-3"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Write a comment..."
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                            value={comment}
                            required
                        />
                        <button type="submit" class="btn btn-primary">
                            Comment
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    ));

    return (
        <>
            <h4 class="mt-5">Forum</h4>
            {postCards}
        </>
    );
}

export default MediaTemplate;
