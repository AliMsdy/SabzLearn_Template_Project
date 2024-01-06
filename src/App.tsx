import { useAuthContext } from "./context/AuthContext";
import { Routes } from "./routes";

function App() {
  const {isLoggedIn} = useAuthContext()
  return <Routes isAuthorized={isLoggedIn} />;
}

export default App;
