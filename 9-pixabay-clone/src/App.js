import { useState, useEffect } from "react";
import Form from "./components/Form";
import ImageList from "./components/ImageList";

function App() {
  const [search, saveSearch] = useState("");
  const [images, saveImages] = useState([]);

  const [currentpage, saveCurrentPage] = useState(1);
  const [totalpages, saveTotalPages] = useState(1);

  useEffect(() => {
    const consultApi = async () => {
      if (search === "") return;

      const imagesByPage = 30;
      const key = "19480537-0d11896520e254533fe28bcaf";
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesByPage}&page=${currentpage}`;

      const response = await fetch(url);
      const result = await response.json();

      saveImages(result.hits);

      const calculateTotalPages = Math.ceil(result.totalHits / imagesByPage);
      saveTotalPages(calculateTotalPages);

      //move screen up
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({behavior: "smooth"})
    };
    consultApi();
  }, [currentpage, search]);

  const previewPage = () => {
    const newCurrentPage = currentpage - 1;

    if (newCurrentPage < 1) return;

    saveCurrentPage(newCurrentPage);
  };

  const nextPage = () => {
    const newCurrentPage = currentpage + 1;

    if (newCurrentPage > totalpages) return;

    saveCurrentPage(newCurrentPage);
  };
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Image Search</p>
        <Form saveSearch={saveSearch} />
      </div>

      <div className="row justify-content-center">
        <ImageList images={images} />

        {currentpage === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-2 mb-5"
            onClick={previewPage}
          >
            ⏪ Previous
          </button>
        )}

        {currentpage === totalpages ? null : (
          <button type="button" className="btn btn-info mb-5" onClick={nextPage}>
            Next ⏩
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
