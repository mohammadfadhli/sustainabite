import { useContext, useEffect, useState } from "react";
import db, { storage } from "../firebase";
import { AuthContext } from "../auth";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import placeholderimage from "../assets/placeholder-image.png";
import { useNavigate } from "react-router";
import axios from "axios";

function AddPost() {
    const [itemname, setItemName] = useState("");
    const [itemqty, setItemQty] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("default");
    const [expirydate, setExpiryDate] = useState("");
    const [profileupdated, setProfileUpdated] = useState(false);
    const [profilePic, setProfilePic] = useState("");
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const [profilePicUrl, setProfilePicUrl] = useState(placeholderimage);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useContext(AuthContext);
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const navigate = useNavigate();

    function addPost(e) {
        e.preventDefault();
        console.log(itemname, itemqty, desc, category, expirydate);
    }

    function ItemPhoto() {
        return (
            <>
                <div className="text-center">
                    <img
                        src={profilePicUrl}
                        className="img-fluid"
                        style={{ width: 300 }}
                    ></img>
                </div>
            </>
        );
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    setAddress(docSnap.data().address);
                    setPostalCode(docSnap.data().postalCode);
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            } catch {}
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (isProfileUpdated == false) {
            setIsProfileUpdated(true);
        } else if (isProfileUpdated == true) {
            setIsProfileUpdated(false);
        }
    }, [profilePicUrl]);

    async function addPost(e) {
        e.preventDefault();

        const docRef = await addDoc(collection(db, "posts"), {
            itemname: itemname,
            itemqty: itemqty,
            desc: desc,
            category: category,
            expirydate: expirydate,
            owner: currentUser.uid,
            address: address,
            postalCode: postalCode,
        });

        await uploadBytes(ref(storage, "itemphotos/" + docRef.id), profilePic)
            .then(async (snapshot) => {
                console.log("Uploaded a blob or file!");

                return getDownloadURL(snapshot.ref);
            })
            .then(async (downloadURL) => {
                await updateDoc(doc(db, `posts`, docRef.id), {
                    itemphoto: downloadURL,
                });
            });

        navigate("/posts");

        axios
            .post(
                "https://api.telegram.org/bot" +
                    import.meta.env.VITE_TELEGRAM_BOT_ID +
                    "/sendMessage?chat_id=" +
                    import.meta.env.VITE_TELEGRAM_CHAT_ID +
                    "&text=" +
                    "Someone just added " +
                    itemqty +
                    "x " +
                    itemname +
                    "! :)",
                {}
            )
            .then(function (response) {
                console.log("alerted group!" + response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <div className="container mb-3">
                <form onSubmit={addPost}>
                    <ItemPhoto></ItemPhoto>
                    <div className="mb-3">
                        <label for="formFile" className="form-label">
                            Upload a picture of your item
                        </label>
                        <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            onChange={(e) => {
                                setProfilePic(e.target.files[0]);
                                setProfilePicUrl(
                                    URL.createObjectURL(e.target.files[0])
                                );
                            }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col">
                                <label for="itemname" className="form-label">
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="itemname"
                                    aria-describedby="itemname"
                                    placeholder="What is it?"
                                    onChange={(e) => {
                                        setItemName(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="col">
                                <label for="itemqty" className="form-label">
                                    Item Quantity
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="itemqty"
                                    aria-describedby="itemqty"
                                    placeholder="Quantity of item?"
                                    onChange={(e) => {
                                        setItemQty(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="desc" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="desc"
                            placeholder="Describe your item!"
                            onChange={(e) => {
                                setDesc(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <label for="desc" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                placeholder="Describe your item!"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
                                required
                            />
                        </div>
                        <div class="col">
                            <label for="desc" className="form-label">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="postalCode"
                                placeholder="Describe your item!"
                                value={postalCode}
                                onChange={(e) => {
                                    setPostalCode(e.target.value);
                                }}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="category" className="form-label">
                            Category
                        </label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                            value={category}
                            required
                        >
                            <option value="default">Pick Category</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Dairy, Chilled & Eggs">
                                Dairy, Chilled & Eggs
                            </option>
                            <option value="Frozen">Frozen</option>
                            <option value="Fruits & Vegetables">
                                Fruits & Vegetables
                            </option>
                            <option value="Meat & Seafood">
                                Meat & Seafood
                            </option>
                            <option value="Rice, Noodles & Cooking Ingredients">
                                Rice, Noodles & Cooking Ingredients
                            </option>
                            <option value="Snacks & Confectionery">
                                Snacks & Confectionery
                            </option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="expirydate" className="form-label">
                            Expiry Date
                        </label>
                        <input
                            type="date"
                            className="ms-3"
                            id="expirydate"
                            onChange={(e) => {
                                setExpiryDate(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div class="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                        Post
                    </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddPost;
