import { useContext, useEffect } from "react";
import MainPanel from "../components/MainPanel";
import UploadPanel from "../components/UploadPanel";
import AuthContext from "../context/auth/authContext";
import FilesContext from "../context/files/filesContext";

const Home = () => {
  const { user, token, isAuthenticated, sendAuthToken } =
    useContext(AuthContext);
  const { getUserLinksFn } = useContext(FilesContext);

  useEffect(async () => {
    if (token) {
      await sendAuthToken();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getUserLinksFn(user);
    }
  }, [user]);



  return (
    <MainPanel>
      <UploadPanel isAuthenticated={isAuthenticated} />
    </MainPanel>
  );
};

export default Home;
