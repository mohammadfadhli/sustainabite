import { useState } from "react";

function AddPost() {
    const [itemname, setItemName] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [expirydate, setExpiryDate] = useState("");
    const [profileupdated, setProfileUpdated] = useState(false);
    const [profilePic, setProfilePic] = useState("");
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const [profilePicUrl, setProfilePicUrl] = useState("");

    function addPost(e) {
        e.preventDefault();
        console.log(itemname, desc, category, expirydate);
    }

    return (
        <>
            <div class="container">
                <form onSubmit={addPost}>
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
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">
                            Item Name
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="itemname"
                            aria-describedby="emailHelp"
                            onChange={(e) => {
                                setItemName(e.target.value);
                            }}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">
                            Description
                        </label>
                        <textarea
                            class="form-control"
                            id="desc"
                            placeholder="description"
                            onChange={(e) => {
                                setDesc(e.target.value);
                            }}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">
                            Category
                        </label>
                        <select
                            class="form-select"
                            aria-label="Default select example"
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                        >
                            <option selected>Open this select menu</option>
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
