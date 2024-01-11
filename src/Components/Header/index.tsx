//components
import { TopBar } from "../TopBar/index.tsx";
import { Navbar } from "@/Components/Navbar";

function Header() {
  return (
    <header>
      <TopBar />
      <Navbar />
    </header>
  );
}

export { Header };
