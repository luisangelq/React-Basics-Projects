import { useContext } from "react";
import MainLayout from "../components/MainLayout";
import { useRouter } from "next/router";

import FirebaseContext from "../context/firebaseContext";

const Search = () => {

const { products } = useContext(FirebaseContext);

console.log(products);
const router = useRouter();
const { query: {q} } = router;

console.log(q);

    return(
        <MainLayout>
        
        </MainLayout>
          
    )
}

export default Search;