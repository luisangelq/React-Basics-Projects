import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { errorAlert } from "../../components/AlertHandler";
import MainPanel from "../../components/MainPanel";
import axiosClient from "../../config/axios";

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

const Download = () => {
  const [download, setDownload] = useState({});
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);
  const [fileExpired, setFileExpired] = useState(false);

  const router = useRouter();

  useEffect(() => {
    //get current path
    async function getDownload() {
      const url = window.location.pathname.split("/")[2];
      console.log(url);

      try {
        const res = await axiosClient.get(`/api/links/${url}`);
        setDownload(res.data.linkObj);

        console.log(res);
      } catch (error) {
        console.log(error.response.data);
        setFileExpired(error.response.data.expired);
      }
    }

    getDownload();
  }, []);

  const downloadFile = async (fileName) => {
    try {
      await axiosClient.get(`/api/files/${fileName}`);

      const link = document.createElement("a");
      link.href = `${process.env.backendURL}/${download.fileName}`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error.response);
      errorAlert(error.response.data);
    }
  };

  const checkPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosClient.post(`/api/links/${download.url}`, {
        password,
        url: download.url,
      });

      setAccess(res.data.access);

      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
      setAccess(error.response.data.access);
      errorAlert(error.response.data);
    }
  };
  return (
    <MainPanel>
      <DownloadPanel>
        <h2>Download Files</h2>
        <p>
          This file was shared via Firefox Send with end-to-end encryption and a
          link that automatically expires.
        </p>

        {download.password && access === false ? (
          <PasswordLock onSubmit={(e) => checkPassword(e)}>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Unlock</button>
          </PasswordLock>
        ) : (
          <>
            <FileCard>
              <img src="/assets/documentIcon.svg" alt="document" />

              {fileExpired ? (
                <div>
                  <h3>File Expired</h3>
                </div>
              ) : (
                <div>
                  <h3>{download.fileName}</h3>
                  <p>{(download.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
                </div>
              )}
            </FileCard>

            {fileExpired ? null : (
              <button onClick={() => downloadFile(download.fileName)}>
                Download
              </button>
            )}

            <button onClick={() => router.push("/")} className="ok">
              OK
            </button>
          </>
        )}
      </DownloadPanel>
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

  button {
    width: 400px;
    background-color: #0060df;
    padding: 1rem;
    outline: none;
    border: none;
    border-radius: 0.5rem;
    color: #fff;
    margin-top: 1.5rem;
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: #003eaa;
    }
  }

  .ok {
    background-color: #fff;
    color: #0060df;
    width: 5rem;
    margin: 0 auto;

    &:hover {
      background-color: #fff;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 5rem 0;

    button {
      width: 100%;
    }
  }
`;

const FileCard = styled.div`
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

  @media (max-width: 768px) {
    width: 100%;

    
  }

`;

const PasswordLock = styled.form`
  width: 450px;
  display: flex;

  input {
    width: 100%;
    padding: 1rem;
    outline: none;
    border: 1px solid lightgray;
    border-top-left-radius: 0.5rem 0.5rem;
    border-bottom-left-radius: 0.5rem 0.5rem;
  }

  button {
    width: 100px;
    border: none;
    outline: none;
    background-color: #0060df;
    color: #fff;
    margin-top: 0;
    border-radius: 0 0.5rem 0.5rem 0;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #003eaa;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;

    input {
      border-radius: .5rem;
    }

    button {
      margin-top: 1rem;
      width: 100%;
      border-radius: .5rem;
    }
  }
`;

export default Download;
