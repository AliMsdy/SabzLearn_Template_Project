import { Header,Footer } from "@/Components";
import { Children } from "@/types/shared";

function Layout({ children }: Children) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export { Layout };
