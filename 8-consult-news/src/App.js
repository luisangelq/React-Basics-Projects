import { useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import NewsList from "./components/NewsList";


function App() {

  const [category, saveCategory] = useState("");
  const [news, saveNews] = useState([]);

  useEffect(() => {
    const consultApi = async () => {
      
      const url = `https://newsapi.org/v2/top-headlines?country=mx&category=${category}&apiKey=eaac32b4dd774828872e4322d2135bd4`;

      const response = await fetch(url)
      const result = await response.json();

      saveNews(result.articles);
    }
    consultApi()
  }, [category])
  
  return (
    <div className="App">
      <Header 
        title="DDC News"
      />

      <div className="container white">
        <Form 
          saveCategory={saveCategory}
        />

        <NewsList 
          news={news}
        />
      </div>
    </div>
  );
}

export default App;
