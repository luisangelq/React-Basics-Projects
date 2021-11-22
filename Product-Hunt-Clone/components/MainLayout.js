
import Header from "./Header";

const MainLayout = (props) => {
  return (
    <>
      <Header />

      <main>{props.children}</main>
    </>
  );
};

export default MainLayout;
