import { useState, useEffect } from "react"
import axios from "axios";
import Swal from "sweetalert2";

import Form from "./components/Form";
import Song from "./components/Song";
import Info from "./components/Info";

function App() {

  const [wordsearch, saveWordSearch] = useState({});
  const [ lyric, saveLyric] = useState("");
  const [ info, saveInfo] = useState({});

  const {artist, song} = wordsearch;

  useEffect(() => {
    if(Object.keys(wordsearch).length === 0) return;

    const consultApi = async () => {
      const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`

      try {
        const [lyric, info] = await Promise.all([
          axios(url),
          axios(url2)
        ]);
        
        if (lyric.length === "") return null;
        saveLyric(lyric.data.lyrics);
        if (Object.keys(info).length === 0) return null;
        saveInfo(info.data.artists[0]);
  
        saveWordSearch({});
        
      } catch (error) {
        console.log(error);
        if(error.response.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Song Not Found',
            showConfirmButton: false,
            timer: 1500
          })
        }
        saveWordSearch({});
      }
      
    }
    consultApi();

  }, [artist, song, wordsearch])
 

  return (
    <div className="App">
      <Form 
        saveWordSearch={saveWordSearch}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info 
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Song 
              lyric={lyric}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
