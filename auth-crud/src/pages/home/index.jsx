import React from 'react'
import { database, db, storage } from '../../firebase';
// import { ref, onValue, set } from 'firebase/database';
import {collection, addDoc } from 'firebase/firestore'

import { ref, getMetadata  } from "firebase/storage";
import avatar from '../../images/avatar.jpg'
const Home = () => {

  // React.useEffect(() => {
  //   const posts = ref(database, 'posts')
  //   onValue(posts, (snapshot) => {
  //     const data = snapshot.val()
  //     console.log(data)
  //   })
  // }, [])

  // React.useEffect(() => {
  //   set(ref(database, 'posts'), {
  //     username: "TranDung",
  //     email: "trandungksnb00@gmail.com",
  //     description: "Xin chao"
  //   });
  // }, [])


  // React.useEffect(() => {
  //   async function demo() {
  //     try {
  //       const docRef = await addDoc(collection(db, "users"), {
  //         first: "Ada",
  //         last: "Lovelace",
  //         born: 1815
  //       });
  //       console.log("Document written with ID: ", docRef.id);
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  //   }
  //   demo()
  // }, [])

  React.useEffect(() => {
    // console.log(storage)
    const imagesRef = ref(storage, 'images');
  //   const avatarRef = ref(storage, 'avatar.jpg');
  //   getMetadata(avatarRef)
  // .then((metadata) => {
  //   console.log(metadata)
  // })
  // .catch((error) => {
  //   // Uh-oh, an error occurred!
  // });
  }, [])
  return (
    <div className="container-fluid">Home</div>
  )
}

export default Home