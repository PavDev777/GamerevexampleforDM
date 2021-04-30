import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../img/logo.svg";
import { clearSearched, fetchSearched } from "../redux/gamesSlice";
import styled from "./nav.module.scss";

const Nav = () => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState("");
  const { isLoadingSearch } = useSelector((state) => state.games);

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearched(textInput));
    setTextInput("");
  };

  const clearSearchHandler = () => {
    dispatch(clearSearched());
  };

  const searchGameHandler = (e) => {
    setTextInput(e.target.value);
    if (textInput === "") {
      dispatch(clearSearched());
    }
  };

  return (
    <nav className={styled.nav}>
      <div onClick={clearSearchHandler} className={styled.logo}>
        <img src={logo} alt="" />
        <h1>Ignite</h1>
      </div>
      <form className={styled.search}>
        <input onChange={searchGameHandler} value={textInput} type="text" />
        <button onClick={submitSearch} type="submit">
          Search
        </button>
        {isLoadingSearch && <div>Loading</div>}
      </form>
    </nav>
  );
};
export default Nav;
