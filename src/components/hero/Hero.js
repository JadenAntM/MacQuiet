import "./Hero.css";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Hero = ({ albums }) => {
  const navigate = useNavigate();

  function reviews(albumId) {
    navigate(`/Reviews/${albumId}`);
  }
  return (
    <div className="album-carousel-container">
      <Carousel>
        {albums?.map((album) => {
          return (
            <Paper key={album.imdbId}>
              <div className="album-card-container">
                <div
                  className="album-card"
                  style={{ "--img": `url(${album.backdrops[0]})` }}
                >
                  <div className="album-detail">
                    <div className="album-poster">
                      <img src={album.poster} alt="" />
                    </div>
                    <div className="album-title">
                      <h4>{album.title}</h4>
                    </div>
                    <div className="album-review-button-container">
                      <Button
                        variant="info"
                        onClick={() => reviews(album.imdbId)}
                        className="align-self-start"
                      >
                        Reviews
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Hero;
