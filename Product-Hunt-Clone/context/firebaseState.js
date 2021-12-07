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
import {
  getFirestore,
  setDoc,
  getDocs,
  getDoc,
  doc,
  collection,
  query,
  updateDoc,
  deleteDoc,
  orderBy
} from "@firebase/firestore";
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

    // Start upload
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on(
      "state_changed",
      // show upload progress
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Subiendo imagen: ${progress}% terminado`);
      },

      (error) => {
        setUploading(false);
        console.error(error);
      },
      // Successfully uploaded
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

  //Get all products
  const getProductsRequest = async (dataCollection, setProducts, order) => {
    const products = [];

    const db = getFirestore();
    const req = query(collection(db, dataCollection), orderBy(order, "desc"));
    const querySnapshot = await getDocs(req);

    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });

    setProducts(products);
  };

  //Get a product
  const getProductRequest = async (id, dataCollection, setProduct) => {
    try {
      const db = getFirestore();
      const req = doc(collection(db, dataCollection), id);
      const product = await getDoc(req);

      if (!product.exists()) {
        errorAlert({ productExists: "This Product Does Not Exist" });
        Router.push("/");
      } else {
        setProduct(product.data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Update a product
  const updateProductRequest = async (id, dataCollection, product) => {
    try {
      console.log(product);
      const db = getFirestore();
      const req = doc(collection(db, dataCollection), id);

      await updateDoc(req, product);
    } catch (error) {
      console.log(error);
    }
  };

  //Delete a product
  const deleteProductRequest = async (id, dataCollection) => {
    try {
      const db = getFirestore();
      const req = doc(collection(db, dataCollection), id);

      await deleteDoc(req);

      successAlert("Product Deleted Successfully");

      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    registerRequest,
    registerErrorRequest,
    loginRequest,
    loginErrorRequest,
    logOutRequest,
    createProductRequest,
    getProductsRequest,
    getProductRequest,
    updateProductRequest,
    deleteProductRequest
  };
};

export default firebaseState;
