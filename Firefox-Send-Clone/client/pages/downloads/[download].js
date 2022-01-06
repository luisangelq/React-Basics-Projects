import { useEffect, useContext } from "react";
import styled from "styled-components";
import MainPanel from "../../components/MainPanel";
import axiosClient from "../../config/axios";
import AuthContext from "../../context/auth/authContext";

export async function getServerSideProps({ params }) {
  const res = await axiosClient.get(`/api/links/${params.download}`);

  return {
    props: {
      download: res.data.linkObj,
    },
  };
}

export async function getServerSidePaths() {
  const links = await axiosClient.get("/api/links");

  return {
    paths: links.data.links.map((link) => ({ params: { download: link.url } })),
    fallback: false,
  };
}

const Download = ({ download }) => {
  const { sendAuthToken } = useContext(AuthContext);
  useEffect(() => {
    sendAuthToken();
  }, []);

  console.log(download);
  return (
    <MainPanel>
      <DownloadPanel>
        <h2>Download Files</h2>
        <p>
          This file was shared via Firefox Send with end-to-end encryption and a
          link that automatically expires.
        </p>

        <div className="fileCard">
          <img src="/assets/documentIcon.svg" />

          <div>
            <h3>{download.fileName}</h3>
            <p>{(download.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
          </div>
        </div>

        <a href={`${process.env.backendURL}/${download.fileName}`}>Download</a>
      </DownloadPanel>
      <PasswordLock></PasswordLock>
    </MainPanel>
  );
};

const DownloadPanel = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  margin: 0 auto;
  text-align: center;

  h2 {
    font-size: 2rem;
  }

  p {
    color: gray;
  }

  .fileCard {
    width: 400px;
    display: flex;
    border: 2px solid #e6e6e6;
    border-radius: 0.5rem;
    padding: 1rem 2rem;
    align-items: center;
    gap: 1rem;

    h3 {
      font-size: 1rem;
    }
    p {
      text-align: left;
      margin: 0.5rem 0 0 0;
    }
  }

  a {
    width: 400px;
    background-color: #0060df;
    padding: 1rem;
    outline: none;
    border: none;
    border-radius: 0.5rem;
    color: #fff;
    margin-top: 1.5rem;
    cursor: pointer;

    &:hover {
      background-color: #003eaa;
    }
  }
`;

const PasswordLock = styled.div``;

export default Download;
