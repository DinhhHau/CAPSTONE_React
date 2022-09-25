import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
// import './assets/scss/styles.scss'

function App() {
  return (
    <div className="App">
      <Header />
      <Menu />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
