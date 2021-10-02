import { useState } from "react";

import Error from "./Error"

const Form = ({saveSearch}) => {

    const [term, saveTerm] = useState("");
    const [error, saveError] = useState(false);


    const searchImages = (e) => {
        e.preventDefault()

        if(term.trim() === "") {
            saveError(true);
            return;
        }
        saveError(false);
        
        saveSearch(term);
    }


    return(
        <form
            onSubmit={searchImages}
        >
            <div className="row ">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search image, example. sports, landscape"
                        onChange={e => saveTerm(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Search"
                    />
                </div>
            </div>
            {error ? <Error message="Add a search term"/> : null}
        </form>
    )
}

export default Form;