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
                            <button
                                type="button"
                                class="btn btn-primary"
                                disabled
                            >
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

    function GetBadge(props){

      if(props.category == "Bakery")
      {
        return <span class="badge text-bg-primary">{props.category}</span>
      }
      else if(props.category == "Dairy, Chilled & Eggs")
      {
        return <span class="badge text-bg-secondary">{props.category}</span>
      }
      else if(props.category == "Fruits & Vegetables")
      {
        return <span class="badge text-bg-success">{props.category}</span>
      }
      else if(props.category == "Meat & Seafood")
      {
        return <span class="badge text-bg-danger">{props.category}</span>
      }
      else if(props.category == "Rice, Noodles & Cooking Ingredients")
      {
        return <span class="badge text-bg-warning">{props.category}</span>
      }
      else if(props.category == "Snacks & Confectionery")
      {
        return <span class="badge text-bg-info">{props.category}</span>
      }

    }

    return (
        <>
            <div class="col-lg-4 col-md-6 col-sm-12 mb-2" key={props.id}>
            <div
            
                class="card h-100"
                id={props.id}
                owner={props.owner}
                style={{ padding: 0 }}
            >
                <img
                    src={props.itemphoto}
                    class="card-img-top"
                    style={{
                        width: "100%",
                        height: "50vh",
                        objectFit: "cover",
                    }}
                />
                <div class="card-body">
                    <h5 class="card-title">
                        {props.itemqty}x {props.itemname}
                    </h5>
                    <GetBadge category={props.category}></GetBadge>
                    <p class="card-text mt-2">{props.desc}</p>
                    <p class="card-text mb-2">
                        <strong>Expiry:</strong> {props.expirydate}
                    </p>
                    <p class="card-text">
                        <strong>Address:</strong> {props.address} S
                        {props.postalCode}
                    </p>
                    
                    <div class="mt-3">
                        <CheckIfOwner></CheckIfOwner>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default PostCard;
