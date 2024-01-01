import { useEffect } from "react";
import { Routes } from "./routes";
import darkModeHandler from "./utils/darkmodeHandler";

function App() {
  useEffect(() => {
    darkModeHandler(true);
  }, []);
  return <Routes isAuthorized={true} />;
}

export default App;
