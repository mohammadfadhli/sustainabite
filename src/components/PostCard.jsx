import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth";
import { collection, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import db from "../firebase";

function PostCard(props) {
  const { currentUser } = useContext(AuthContext);

  async function sendCollectRequest() {
    await updateDoc(doc(db, `posts`, props.id), {
      collectionrequestedby: currentUser.uid,
    });
    window.location.reload();
  }

  async function confirmCollected() {
    await deleteDoc(doc(db, "posts", props.id));
    window.location.reload();
  }

  function CheckIfOwner() {
    if (currentUser) {
      if (currentUser.uid != props.owner) {
        // if not owner
        if (props.requestedby) {
          return (
            <>
              <button type="button" class="btn btn-primary" disabled>
                Pending Collection
              </button>
            </>
          );
        } else {
          return (
            <>
              <button
                type="button"
                class="btn btn-primary"
                onClick={sendCollectRequest}
              >
                Collect
              </button>
            </>
          );
        }
      } // if owner
      else {
        if (props.requestedby) {
          return (
            <>
              <button
                type="button"
                class="btn btn-primary"
                onClick={confirmCollected}
              >
                Item Collected
              </button>
            </>
          );
        }
      }
    }
  }

  return (
    <>
      <div
        class="card col-xl-3 col-lg-4 col-md-6 col-12 ms-3"
        id={props.id}
        owner={props.owner}
      >
        <img
          src={props.itemphoto}
          class="card-img-top"
          style={{ width: "100%", height: "20vw", objectFit: "cover" }}
        />
        <div class="card-body">
          <h5 class="card-title">{props.itemname}</h5>
          <p class="card-text">{props.desc}</p>
          <p class="card-text">Expiry: {props.expirydate}</p>
          <span class="badge text-bg-primary">{props.category}</span>
          <CheckIfOwner></CheckIfOwner>
        </div>
      </div>
    </>
  );
}

export default PostCard;
