import logo from "./logo.svg";
import "./App.css";
import api from "./api/axiosconfig";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Reviews from "./components/review/Reviews";

function App() {
  const [albums, setAlbums] = useState();
  const [album, setAlbum] = useState();
  const [reviews, setReviews] = useState();

  const getAlbums = async () => {
    try {
      const response = await api.get("/api/v1/albums");

      setAlbums(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAlbumData = async (albumId) => {
    try {
      const response = await api.get(`/api/v1/albums/${albumId}`);

      const singleAlbum = response.data;

      setAlbum(singleAlbum);

      setReviews(singleAlbum.reviews || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home albums={albums} />}></Route>
          <Route
            path="/Reviews/:albumId"
            element={
              <Reviews
                getAlbumData={getAlbumData}
                album={album}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
