import { useContext, useEffect } from "react";
import MainPanel from "../components/MainPanel";
import UploadPanel from "../components/UploadPanel";
import AuthContext from "../context/auth/authContext";

const Home = () => {
  const {token, isAuthenticated, sendAuthToken } = useContext(AuthContext);

  useEffect(() => {
    if(token) {
      sendAuthToken();
    }
  }, []);

  return (
    <MainPanel>
      <UploadPanel isAuthenticated={isAuthenticated} />
    </MainPanel>
  );
};

export default Home;
