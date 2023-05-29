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
import "../styles/MediaTemplate.css";

function MediaTemplate(props) {
    const [comment, setComment] = useState("");
    const { currentUser } = useContext(AuthContext);
    const [checked, setChecked] = useState();

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

    function LikeCheckbox(props) {
        if (props.likes.includes(currentUser.uid)) {
            // setChecked(true)

            return (
                <>
                    <input
                        class="form-check-input checkbox"
                        type="checkbox"
                        id={props.id}
                        onChange={(e) => checkLike(e)}
                        checked
                    />
                    <label for={props.id} class="px-2">
                        <svg
                            id="heart-svg"
                            viewBox="467 392 58 57"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g
                                id="Group"
                                fill="none"
                                fill-rule="evenodd"
                                transform="translate(467 392)"
                            >
                                <path
                                    d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                                    id="heart"
                                    fill="#AAB8C2"
                                />
                                <circle
                                    id="main-circ"
                                    fill="#E2264D"
                                    opacity="0"
                                    cx="29.5"
                                    cy="29.5"
                                    r="1.5"
                                />

                                <g
                                    id="grp7"
                                    opacity="0"
                                    transform="translate(7 6)"
                                >
                                    <circle
                                        id="oval1"
                                        fill="#9CD8C3"
                                        cx="2"
                                        cy="6"
                                        r="2"
                                    />
                                    <circle
                                        id="oval2"
                                        fill="#8CE8C3"
                                        cx="5"
                                        cy="2"
                                        r="2"
                                    />
                                </g>

                                <g
                                    id="grp6"
                                    opacity="0"
                                    transform="translate(0 28)"
                                >
                                    <circle
                                        id="oval1"
                                        fill="#CC8EF5"
                                        cx="2"
                                        cy="7"
                                        r="2"
                                    />
                                    <circle
                                        id="oval2"
                                        fill="#91D2FA"
                                        cx="3"
                                        cy="2"
                                        r="2"
                                    />
                                </g>

                                <g
                                    id="grp3"
                                    opacity="0"
                                    transform="translate(52 28)"
                                >
                                    <circle
                                        id="oval2"
                                        fill="#9CD8C3"
                                        cx="2"
                                        cy="7"
                                        r="2"
                                    />
                                    <circle
                                        id="oval1"
                                        fill="#8CE8C3"
                                        cx="4"
                                        cy="2"
                                        r="2"
                                    />
                                </g>

                                <g
                                    id="grp2"
                                    opacity="0"
                                    transform="translate(44 6)"
                                >
                                    <circle
                                        id="oval2"
                                        fill="#CC8EF5"
                                        cx="5"
                                        cy="6"
                                        r="2"
                                    />
                                    <circle
                                        id="oval1"
                                        fill="#CC8EF5"
                                        cx="2"
                                        cy="2"
                                        r="2"
                                    />
                                </g>

                                <g
                                    id="grp5"
                                    opacity="0"
                                    transform="translate(14 50)"
                                >
                                    <circle
                                        id="oval1"
                                        fill="#91D2FA"
                                        cx="6"
                                        cy="5"
                                        r="2"
                                    />
                                    <circle
                                        id="oval2"
                                        fill="#91D2FA"
                                        cx="2"
                                        cy="2"
                                        r="2"
                                    />
                                </g>

                                <g
                                    id="grp4"
                                    opacity="0"
                                    transform="translate(35 50)"
                                >
                                    <circle
                                        id="oval1"
                                        fill="#F48EA7"
                                        cx="6"
                                        cy="5"
                                        r="2"
                                    />
                                    <circle
                                        id="oval2"
                                        fill="#F48EA7"
                                        cx="2"
                                        cy="2"
                                        r="2"
                                    />
                                </g>

                                <g
                                    id="grp1"
                                    opacity="0"
                                    transform="translate(24)"
                                >
                                    <circle
                                        id="oval1"
                                        fill="#9FC7FA"
                                        cx="2.5"
                                        cy="3"
                                        r="2"
                                    />
                                    <circle
                                        id="oval2"
                                        fill="#9FC7FA"
                                        cx="7.5"
                                        cy="2"
                                        r="2"
                                    />
                                </g>
                            </g>
                        </svg>
                    </label>
                    <h6 class="px-3 mt-2">
                        {props.likes.length} person likes this.
                    </h6>
                </>
            );
        } else {
            // setChecked(false)

            return (
                <>
                    <input
                        class="form-check-input checkbox"
                        type="checkbox"
                        id={props.id}
                        onChange={(e) => checkLike(e)}
                    />
                    <label for={props.id} class="px-2">
                        <svg
                            id="heart-svg"
                            viewBox="467 392 58 57"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g
                                id="Group"
                                fill="none"
                                fill-rule="evenodd"
                                transform="translate(467 392)"
                            >
                                <path
                                    d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                                    id="heart"
                                    fill="#AAB8C2"
                                />
                                <circle
                                    id="main-circ"
                                    fill="#E2264D"
                                    opacity="0"
                                    cx="29.5"
                                    cy="29.5"
                                    r="1.5"
                                />

                                <g
                                    id="grp7"
                                    opacity="0"
                                    transform="translate(7 6)"
                                >
                                    <circle
                                        id="oval1"
                                        fill="#9CD8C3"
                                        cx="2"
                                        cy="6"
                                        r="2"
                                    />
                                    <circle
                                        id="oval2"
                                        fill="#8CE8C3"
                                        cx="5"
                                        cy="2"
                                        r="2"
                                    />
                                </g>

                                <g
                                    id="grp6"
                                    opacity="0"
                                    transform="translate(0 28)"
                                >
                                    <circle
                                        id="oval1"
                                        fill="#CC8EF5"
                                        cx="2"
                                        cy="7"
                                        r="2"
                                    />
                                    <circle
                                        id="oval2"
                                        fill="#91D2FA"
                                        cx="3"
                                        cy="2"
                                        r="2"
                                    />
                                </g>

                                <g
                                    id="grp3"
                                    opacity="0"
                                    transform="translate(52 28)"
                                >
                                    <circle
                                        id="oval2"
                                        fill="#9CD8C3"
                                        cx="2"
                                        cy="7"
                                        r="2"
                                    />
                                    <circle
                                        id="oval1"
                                        fill="#8CE8C3"
                                        cx="4"
                                        cy="2"
                                        r="2"
                                    />
                                </g>

                                <g
                                    id="grp2"
                                    opacity="0"
                                    transform="translate(44 6)"
                                >
                                    <circle
                                        id="oval2"
                                        fill="#CC8EF5"
                                        cx="5"
                                        cy="6"
                                        r="2"
                                    />
                                    <circle
                                        id="oval1"
                                        fill="#CC8EF5"
                                        cx="2"
                                        cy="2"
                                        r="2"
                                    />
                                </g>

                                <g
                                    id="grp5"
                                    opacity="0"
                                    transform="translate(14 50)"
                                >
                                    <circle
                                        id="oval1"
                                        fill="#91D2FA"
                                        cx="6"
                                        cy="5"
                                        r="2"
                                    />
                                    <circle
                                        id="oval2"
                                        fill="#91D2FA"
                                        cx="2"
                                        cy="2"
                                        r="2"
                                    />
                                </g>

                                <g
                                    id="grp4"
                                    opacity="0"
                                    transform="translate(35 50)"
                                >
                                    <circle
                                        id="oval1"
                                        fill="#F48EA7"
                                        cx="6"
                                        cy="5"
                                        r="2"
                                    />
                                    <circle
                                        id="oval2"
                                        fill="#F48EA7"
                                        cx="2"
                                        cy="2"
                                        r="2"
                                    />
                                </g>

                                <g
                                    id="grp1"
                                    opacity="0"
                                    transform="translate(24)"
                                >
                                    <circle
                                        id="oval1"
                                        fill="#9FC7FA"
                                        cx="2.5"
                                        cy="3"
                                        r="2"
                                    />
                                    <circle
                                        id="oval2"
                                        fill="#9FC7FA"
                                        cx="7.5"
                                        cy="2"
                                        r="2"
                                    />
                                </g>
                            </g>
                        </svg>
                    </label>
                    <h6 class="px-3 mt-2">
                        {props.likes.length} people likes this.
                    </h6>
                </>
            );
        }
    }

    const postCards = props.forumPosts.map((post) => (
        <Fragment key={post.id}>
            <div class="border border-dark-subtle pb-3 rounded-3 mb-3" id="postsDiv">
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
                <div class="">
                    <LikeCheckbox
                        id={post.id}
                        likes={post.data().likes}
                    ></LikeCheckbox>
                </div>

                {/* comments section */}
                <div class="px-3 border-top">
                    <h6 class="mt-3">Comments</h6>
                    <GetComments
                        allcomments={post.data().comments}
                    ></GetComments>
                    <form onSubmit={addComment} id={post.id}>
                        <textarea
                            // type="textarea"
                            class="form-control my-3"
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
