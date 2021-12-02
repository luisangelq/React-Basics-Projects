import { initializeApp } from "firebase/app";
import firestore from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyApo_pvnNfBmcRo-IjIe7JeDVX5zIQzQr0",
  authDomain: "product-hunt-clone-66484.firebaseapp.com",
  projectId: "product-hunt-clone-66484",
  storageBucket: "product-hunt-clone-66484.appspot.com",
  messagingSenderId: "663461294455",
  appId: "1:663461294455:web:068eebcf32e09b7f0a7172",
  measurementId: "G-E089HQ981X",
});

const storage = getStorage(firebaseApp);

export {
  firebaseApp,
  firestore,
  storage,

};
