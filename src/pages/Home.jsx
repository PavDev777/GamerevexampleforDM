import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";
import { loadGamesAsync } from "../redux/gamesSlice";
import styled from "./home.module.scss";

const Home = () => {
  const currentLocation = useLocation();
  const pathID = currentLocation.pathname.split("/")[2];

  const dispatch = useDispatch();
  const {
    popularGames,
    newGames,
    upcomingGames,
    isLoading,
    searched,
  } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(loadGamesAsync());
  }, [dispatch]);

  return (
    <div className={styled.gameList}>
      {pathID && <GameDetail />}

      {searched.length ? (
        <div className="searched">
          <h2>Searched Games</h2>
          {isLoading && <div style={{ textAlign: "center" }}>Loading </div>}
          <div className={styled.games}>
            {searched.map((game) => (
              <Game
                key={game.id}
                name={game.name}
                released={game.released}
                id={game.id}
                image={game.background_image}
              />
            ))}
          </div>
        </div>
      ): ''}

      <h2>Upcoming Games</h2>
      {isLoading && <div style={{ textAlign: "center" }}>Loading </div>}
      <div className={styled.games}>
        {upcomingGames.map((game) => (
          <Game
            key={game.id}
            name={game.name}
            released={game.released}
            id={game.id}
            image={game.background_image}
          />
        ))}
      </div>
      <h2>Popular Games</h2>
      {isLoading && <div>Loading </div>}
      <div className={styled.games}>
        {popularGames.map((game) => (
          <Game
            key={game.id}
            name={game.name}
            released={game.released}
            id={game.id}
            image={game.background_image}
          />
        ))}
      </div>
      <h2>New Games</h2>
      {isLoading && <div>Loading </div>}
      <div className={styled.games}>
        {newGames.map((game) => (
          <Game
            key={game.id}
            name={game.name}
            released={game.released}
            id={game.id}
            image={game.background_image}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
