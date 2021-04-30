import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "./gameDetail.module.scss";

//img
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
//star images
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";

const GameDetail = () => {
  const history = useHistory();
  const { game, screen, isLoading } = useSelector((state) => state.gameDetails);

  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains(styled.cardShadow)) {
      document.body.style.overflow = "auto";
      history.push("/");
    }
  };

  const escFunction = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        document.body.style.overflow = "auto";
        history.push("/");
      }
    },
    [history]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    console.log("heyy");

    return () => {
      console.log("uau");
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  const getPlatform = (platform) => {
    switch (platform) {
      case "PlayStation 4":
        return playstation;
      case "Xbox One":
        return xbox;
      case "PC":
        return steam;
      case "Nintendo Swith":
        return nintendo;
      case "IOS":
        return apple;
      default:
        return gamepad;
    }
  };

  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="" src={starFull} key={i}></img>);
      } else {
        stars.push(<img alt="" src={starEmpty} key={i}></img>);
      }
    } 
    return stars;
  };

  return (
    <div className={styled.cardShadow} onClick={exitDetailHandler}>
      <div className={styled.detail}>
        {isLoading && <div style={{ textAlign: "center" }}>Loading</div>}
        {!isLoading && (
          <>
            <div className={styled.stats}>
              <div className={styled.rating}>
                <h3>{game.name}</h3>
                <p>Rating: {game.rating}</p>
                {getStars()}
              </div>
              <div className={styled.info}>
                <h3>Platforms</h3>
                <div className={styled.platforms}>
                  {game.platforms.map((data) => (
                    <img
                      key={data.platform.id}
                      src={getPlatform(data.platform.name)}
                      alt=""
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={styled.media}>
              <img src={game.background_image} alt="" />
            </div>
            <div className={styled.description}>
              <p> {game.description_raw} </p>
            </div>
            <div className={styled.gallery}>
              {screen.map((screen) => (
                <img src={screen.image} key={screen.id} alt="" />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default GameDetail;
