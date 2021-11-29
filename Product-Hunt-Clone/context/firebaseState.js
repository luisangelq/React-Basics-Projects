import { errorAlert, successAlert } from "../helpers/validations/AlertHandler";
import Router from "next/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { firebaseApp, storage } from "../firebase";
import { getFirestore, setDoc, doc } from "@firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";

const firebaseState = () => {
  firebaseApp;

  //Register User on Firebase
  const registerRequest = async (name, email, password) => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);

    //Update the user name profile
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    successAlert("User Created Successfully");
  };

  const registerErrorRequest = (error) => {
    const emailExist = error.includes("email-already-in-use");
    if (emailExist) {
      errorAlert({ emailExists: "This Email Already Exist" });
    }
  };

  const loginRequest = async (email, password) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
    successAlert("User Logged In Successfully");
  };

  const loginErrorRequest = (error) => {
    const userExist = error.includes("user-not-found");
    if (userExist) {
      errorAlert({ userExists: "This User Does Not Exist, Create An Account" });
    }
  };

  //Log Out User on Firebase
  const logOutRequest = async () => {
    const auth = getAuth();
    await signOut(auth);
    successAlert("User Logged Out Successfully");
  };

  //file uploader function
  const createProductRequest = async (
    image,
    setUploading,
    setImageURL,
    product
  ) => {
    setUploading(true);

    const id = Math.random().toString(36).substring(2);
    const imageRef = ref(storage, `products/${id}`);

    // Se inicia la subida
    const uploadTask = uploadBytesResumable(imageRef, image);

    // Registra eventos para cuando detecte un cambio en el estado de la subida
    uploadTask.on(
      "state_changed",
      // Muestra progreso de la subida
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Subiendo imagen: ${progress}% terminado`);
      },
      // En caso de error
      (error) => {
        setUploading(false);
        console.error(error);
      },
      // Subida finalizada correctamente
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((imageURL) => {
          console.log("Imagen disponible en:", imageURL);
          setImageURL(imageURL);

          //Create product on Firebase
          createProductFirebase({ ...product, imageURL }, setUploading);
        });
      }
    );
  };

  //Create a new product
  const createProductFirebase = async (product, setUploading) => {
    console.log(product);
    const db = getFirestore();

    const newProduct = doc(db, `products/${Date.now()}`);

    await setDoc(newProduct, product);

    setUploading(false);
    successAlert("Product Created Successfully");

    Router.push("/");
  };

  return {
    registerRequest,
    registerErrorRequest,
    loginRequest,
    loginErrorRequest,
    logOutRequest,
    createProductRequest,
  };
};

export default firebaseState;
