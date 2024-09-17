import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Namecontext from "./context/Namecontext.jsx";

createRoot(document.getElementById("root")).render(
  <Namecontext>
      <App />
  </Namecontext>
    
);
