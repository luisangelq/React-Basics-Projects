import { useContext, useEffect } from "react";
import MainPanel from "../components/MainPanel";
import UploadPanel from "../components/UploadPanel";
import AuthContext from "../context/auth/authContext";

const Home = () => {
  const {user, isAuthenticated, sendAuthToken } = useContext(AuthContext);

  useEffect(() => {
    sendAuthToken();
  }, []);

  return (
    <MainPanel>
      <UploadPanel isAuthenticated={isAuthenticated} />
    </MainPanel>
  );
};

export default Home;
