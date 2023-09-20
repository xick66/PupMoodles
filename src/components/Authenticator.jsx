import { signInWithRedirect, signOut } from "firebase/auth";
import { googleProvider, db, auth } from "../config/Firebase";
import { Image } from "@nextui-org/react";

const imgSrc = "/images/btn_google_signin_dark_focus_web2x.png";

const Authenticator = ({ setUser }) => {
  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
      const currentUser = auth.currentUser;
      if (currentUser) {
        const googleUserId = currentUser.uid;
        const email = currentUser.email;

        // Check if the user already exists
        const userRef = db.collection("Users").doc(googleUserId);
        const userSnapshot = await userRef.get();
        setUser(currentUser);
        if (userSnapshot.exists) {
          // User already exists, no need to create a new collection
          // console.log("User already exists");
        } else {
          const userCollectionRef = db
            .collection("Users")
            .doc(googleUserId)
            .collection();
          await userCollectionRef.doc("Profile").set({
            email,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {auth.currentUser ? (
        <div className="AuthContainerCenter">
          <div className="containerRight">
            <Image
              width={60}
              height={60}
              css={{ borderRadius: 20 }}
              referrerPolicy="no-referrer"
              src={auth?.currentUser?.photoURL}
              onClick={() => logout()}
              alt="sign out button"
            />
            <p style={{ marginTop: 10}}>Log Out</p>
          </div>
        </div>
      ) : (
        <div className="containerCenter">
          <p className="text">Please sign in to get started</p>
          <img
            className="googleButton"
            src={imgSrc}
            onClick={signInWithGoogle}
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
};

export default Authenticator;
