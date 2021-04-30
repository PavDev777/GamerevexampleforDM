import { Route } from "react-router";
import Nav from "./components/Nav";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <Nav />
      <Route path={["/game/:id", "/"]} component={Home} />
    </div>
  );
}

export default App;
