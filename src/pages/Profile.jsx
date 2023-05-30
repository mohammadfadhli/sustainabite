import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import placeholderimage from "../assets/placeholder-image.png";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [address, setAddress] = useState("");
  const [allergy, setAllergy] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState(placeholderimage);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPic = async () => {
      await getDownloadURL(ref(storage, "users/" + currentUser.uid))
        .then((url) => {
          console.log("downloaded file: " + url);
          setProfilePicUrl(url);
        })
        .catch((error) => {});
    };

    async function fetchData() {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setAddress(docSnap.data().address);
          setAllergy(docSnap.data().allergy);
          setDisplayName(docSnap.data().displayName);
          setpostalCode(docSnap.data().postalCode);
          setPhotoUrl(docSnap.data().photoUrl);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch {}
    }

    fetchData();
    fetchPic();
    setIsLoading(false);
  }, []);

  async function updateProfile(e) {
    e.preventDefault();

    await uploadBytes(ref(storage, "users/" + currentUser.uid), profilePic)
      .then(async (snapshot) => {
        console.log("Uploaded a blob or file!");

        return getDownloadURL(snapshot.ref);
      })
      .then(async (downloadURL) => {
        await updateDoc(doc(db, `users`, currentUser.uid), {
          itemphoto: downloadURL,
          address: address,
          displayName: displayName,
          postalCode: postalCode,
        });
      });
  }

  function HasProfilePicture() {
    if (isLoading == false) {
      return (
        <>
          <div class="text-center mt-3">
            <img src={profilePicUrl} class="img" style={{ width: 200 }}></img>
          </div>
        </>
      );
    } else if (isLoading == true) {
      return (
        <>
          <div class="text-center mt-5">
            <div
              class="spinner-border"
              role="status"
              style={{ width: 48, height: 48 }}
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <div class="container mt-5">
        <h4 class="text-center">Edit Profile</h4>
        <HasProfilePicture></HasProfilePicture>
        <form onSubmit={updateProfile}>
          <div class="my-3">
            <label for="formFile" class="form-label">
              Profile Picture
            </label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              onChange={(e) => {
                setProfilePic(e.target.files[0]);
                setProfilePicUrl(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">
              Display Name
            </label>
            <input
              type="text"
              class="form-control"
              id="username"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              required
            />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">
              Address
            </label>
            <input
              type="text"
              class="form-control"
              id="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
          </div>
          <div class="mb-3">
            <label for="postalCode" class="form-label">
              Postal Code
            </label>
            <input
              type="number"
              class="form-control"
              id="postalCode"
              value={postalCode}
              onChange={(e) => {
                setpostalCode(e.target.value);
              }}
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Save Profile
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
