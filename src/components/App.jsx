import { useState, useEffect } from "react";
import Banner from "./Banner";
import Authenticator from "./Authenticator";
import { auth, db } from "../config/Firebase";
import { onSnapshot, query, collection } from "firebase/firestore";
import { Spinner } from "@nextui-org/react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

export default function App() {
  const [logged, setLogged] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLogged(user !== null);
    });

    // cleanup subscription
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "Users", user.uid, "Entries"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const entries = [];
        querySnapshot.forEach((doc) => {
          // If there are any pending writes to the backend, return
          if (doc.metadata.hasPendingWrites) return;
          entries.push({ id: doc.id, ...doc.data() });
        });
        entries.sort((a, b) => a.datetime.seconds - b.datetime.seconds);
        setData(entries);
        setLoading(false);
      });

      // cleanup subscription
      return () => unsubscribe();
    }
  }, [user]);

  const deleteItem = async (id) => {
    try {
      const docRef = doc(db, "Users", user.uid, "Entries", id);
      const docSnap = await getDoc(docRef);

      // Check if document exists before deleting
      if (docSnap.exists()) {
        await deleteDoc(docRef);
        // Use a functional update here
        setData((prevData) => prevData.filter((item) => item.id !== id));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="landingContainer">
      {logged === true && user !== null ? (
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <Banner data={data} deleteItem={deleteItem} />
          )}
        </div>
      ) : (
        <div>
          <Authenticator setUser={setUser} />
        </div>
      )}
    </div>
  );
}
