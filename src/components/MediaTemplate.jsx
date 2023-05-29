import { Fragment, useEffect, useState } from "react";
import placeholderimage from "../assets/placeholder-image.png";
import pp from "../assets/pp.png";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";

function MediaTemplate(props) {

    const postCards = props.forumPosts.map((post) => (
        <Fragment key={post.id}>
            <div class="border border-dark pb-3 rounded-3">
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
                                <p>time</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom Part */}
                <div class="px-3">
                    <p>{post.data().post}</p>
                </div>
                <div class="px-3">
                    <button type="button" class="btn btn-primary">
                        Like
                    </button>
                    <button type="button" class="btn btn-primary ms-3">
                        Comment
                    </button>
                </div>
            </div>
        </Fragment>
    ));

    return <>{postCards}</>;
}

export default MediaTemplate;
