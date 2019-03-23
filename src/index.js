import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { makeMainRoutes } from "./routes";

const routes = makeMainRoutes();

ReactDOM.render(routes, document.getElementById("root"));
