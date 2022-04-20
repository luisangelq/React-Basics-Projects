import Head from "next/head";
import Modal from "react-modal";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from "./Sidebar";
import ProductModal from "./ProductModal";
import Steps from "./Steps";

import useRestaurant from "../hooks/useRestaurant";

const Layout = ({ children, page }) => {
  const { modal, handleModal } = useRestaurant();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  

  Modal.setAppElement("#__next");
  return (
    <>
      <Head>
        <title>Restaurant App {page ? "- " + page : null}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Restaurant App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 ">
          <Sidebar />
        </aside>

        <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen md:overflow-y-scroll p-5">
          <Steps />
          {children}
        </main>
      </div>

      {modal && (
        <Modal
          isOpen={modal}
          onRequestClose={() => {
            handleModal(false);
          }}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <ProductModal />
        </Modal>
      )}

      <ToastContainer />
    </>
  );
};

export default Layout;
