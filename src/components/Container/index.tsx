// Components
import { Footer } from "../Footer";
import { NavBar } from "../NavBar";

// TS
type ContainerProps = {
  children: React.ReactNode;
};
export const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};
