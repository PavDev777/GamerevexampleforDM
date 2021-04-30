import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { gamesDetailAsync } from "../redux/gameDetail";
import styled from "./game.module.scss";

const Game = ({ id, image, released, name }) => {
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    dispatch(gamesDetailAsync({ id }));
  };
  return (
    <div className={styled.game} onClick={loadDetailHandler}>
      <Link to={`/game/${id}`}>
        <h3>{name}</h3>
        <p>{released}</p>
        <div className={styled.game__img}>
          <img src={image} alt={name} />
        </div>
      </Link>
    </div>
  );
};
export default Game;
