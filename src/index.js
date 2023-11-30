import AOS from "aos";
import "aos/dist/aos.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Unchurch.css";
import { setPrefix } from "./lib/Bandung";
import "./lib/Bandung.css";

setPrefix("http://localhost:5000/https://www.uncovergem.com");
// if we're running java server locally
// setPrefix("http://localhost:5000/http://localhost:8080") ;

AOS.init();

// ReactDOM.createRoot(document.getElementById("root")).render(<Router/>) ;
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
