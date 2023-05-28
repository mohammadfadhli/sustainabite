import { useContext, useEffect, useState } from "react";
import db, { storage } from "../firebase";
import { AuthContext } from "../auth";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import placeholderimage from "../assets/placeholder-image.png";
import { useNavigate } from "react-router";

function AddPost() {
    const [itemname, setItemName] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("default");
    const [expirydate, setExpiryDate] = useState("");
    const [profileupdated, setProfileUpdated] = useState(false);
    const [profilePic, setProfilePic] = useState("");
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const [profilePicUrl, setProfilePicUrl] = useState(placeholderimage);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    function addPost(e) {
        e.preventDefault();
        console.log(itemname, desc, category, expirydate);
    }

    function ItemPhoto() {
        return (
            <>
                <div class="text-center">
                    <img
                        src={profilePicUrl}
                        class="img-fluid"
                        style={{ width: 300 }}
                    ></img>
                </div>
            </>
        );
    }

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
            desc: desc,
            category: category,
            expirydate: expirydate,
            owner: currentUser.uid,
        });

        await uploadBytes(
            ref(storage, "itemphotos/" + docRef.id),
            profilePic
        ).then(async (snapshot) => {
            console.log("Uploaded a blob or file!");

            return getDownloadURL(snapshot.ref);
        })
        .then(async (downloadURL) => {
            await updateDoc(doc(db, `posts`, docRef.id), {
                itemphoto: downloadURL,
            });
        });

        navigate("/posts");
    }

    return (
        <>
            <div class="container mb-3">
                <form onSubmit={addPost}>
                    <ItemPhoto></ItemPhoto>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">
                            Upload a picture of your item
                        </label>
                        <input
                            class="form-control"
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
                    <div class="mb-3">
                        <label for="itemname" class="form-label">
                            Item Name
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="itemname"
                            aria-describedby="itemname"
                            placeholder="What is it?"
                            onChange={(e) => {
                                setItemName(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <label for="desc" class="form-label">
                            Description
                        </label>
                        <textarea
                            class="form-control"
                            id="desc"
                            placeholder="Describe your item!"
                            onChange={(e) => {
                                setDesc(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <label for="category" class="form-label">
                            Category
                        </label>
                        <select
                            class="form-select"
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
                    <div class="mb-3">
                        <label for="expirydate" class="form-label">
                            Expiry Date
                        </label>
                        <input
                            type="date"
                            class="ms-3"
                            id="expirydate"
                            onChange={(e) => {
                                setExpiryDate(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default AddPost;
