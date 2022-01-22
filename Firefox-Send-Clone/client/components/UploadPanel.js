import { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import shortId from "shortid";
import JSZip from "jszip";
import axiosClient from "../config/axios";

import styled from "styled-components";
import { errorAlert, goToSignUp } from "./AlertHandler";

import DropzoneManager from "./Dropzone/DropzoneManager";
import FilesManager from "./Dropzone/FilesManager";

import FilesContext from "../context/files/filesContext";
import LinkPage from "./LinkPage";

const UploadPanel = ({ isAuthenticated }) => {
  const [isCheck, setIsCheck] = useState(false);
  const [fileName, setFileName] = useState("");
  const {
    files,
    zipFiles,
    links,
    url,
    loading,
    setFileFn,
    deleteFileFn,
    uploadZipFileFn,
    getUserLinksFn,
    loadingFn,
    deleteLinkFn,
  } = useContext(FilesContext);

  console.log(links);

  const onDropRejected = useCallback((rejectedFiles) => {
    console.log(rejectedFiles);
  }, []);

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    Array.from(acceptedFiles).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];

        const fileData = {
          fileId: shortId.generate(),
          base64,
          name: file.name,
          size: file.size,
        };

        setFileFn(fileData);
      };
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    maxSize: isAuthenticated ? 1024 * 1024 * 10 : 1024 * 1024,
  });

  const uploadFile = async (fileParams) => {
    loadingFn(true);

    const totalSize = files.reduce((total, file) => total + file.size, 0);

    if (!isAuthenticated && totalSize > 1024 * 1024) {
      goToSignUp({ msg: "Files Exceed 1MB" }, "Sign Up");
      loadingFn(false);
      return;
    }

    if (isAuthenticated && totalSize > 1024 * 1024 * 10) {
      errorAlert({ msg: "Files Exceed 10MB" });
      loadingFn(false);
      return;
    }

    const zip = new JSZip();
    files.map((file) => {
      zip.file(file.name, file.base64, { base64: true });
    });

    const zipFile = await zip
      .generateAsync({ type: "blob" })
      .then((content) => {
        const fileName = "files.zip";
        const file = new File([content], fileName, {
          type: "application/zip",
        });

        return file;
      });

    const formData = new FormData();
    formData.append("file", zipFile);

    uploadZipFileFn(formData, fileParams);
  };

  const formatDate = (date) => {
    const expireDate = new Date(date) - new Date();

    //transform miliseconds to days
    const days = Math.floor(expireDate / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (expireDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((expireDate % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  };

  const downloadFile = async (fileName) => {
    console.log(fileName);
    try {
      const res = await axiosClient.get(`/api/files/${fileName}`);
      console.log(res);

      const link = document.createElement("a");
      link.href = `${process.env.backendURL}/${fileName}`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      await getUserLinksFn();
    } catch (error) {
      console.log(error.response);
      errorAlert(error.response.data);
    }
  };

  return (
    <>
      {url === null ? (
        <Container>
          {!files.length > 0 ? (
            <DropzoneManager
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              isDragActive={isDragActive}
              isAuthenticated={isAuthenticated}
            />
          ) : (
            <FilesManager
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              uploadFile={uploadFile}
              isAuthenticated={isAuthenticated}
              files={files}
              deleteFileFn={deleteFileFn}
              loading={loading}
            />
          )}

          <LinkList>
            {links.length === 0 ? (
              <>
                <h1>Simple, private file sharing</h1>
                <p>
                  Firefox Send lets you share files with end-to-end encryption
                  and a link that automatically expires. So you can keep what
                  you share private and make sure your stuff doesn’t stay online
                  forever.
                </p>
                <img src="assets/IntroImage.svg" alt="intro" />
              </>
            ) : (
              links
                .map((link) =>
                  link.downloads > 0 ? (
                    <LinkCard key={link.fileName}>
                      <div className="name">
                        <img
                          src="assets/documentIcon.svg"
                          className="documentImg"
                          alt="document"
                        />
                        <div>
                          <p>{link.fileName}</p>
                          <p className="fileSize">
                            {(link.size / Math.pow(1024, 2)).toFixed(2)} MB
                          </p>
                        </div>

                        <button onClick={() => deleteLinkFn(link.url)}>
                          <img src="assets/deleteIcon.svg" alt="delete" />
                        </button>
                      </div>
                      <div className="expire">
                        <p>
                          Expires after {link.downloads} downloads or{" "}
                          {formatDate(link.expires)}
                        </p>

                        <div></div>
                      </div>
                      <div className="actions">
                        <button onClick={() => downloadFile(link.fileName)}>
                          Download
                        </button>
                        <button
                          onClick={() => {
                            // copy link to clipboard
                            navigator.clipboard.writeText(
                              `${process.env.frontendURL}/downloads/${link.url}`
                            );
                            setFileName(link.fileName);
                            setIsCheck(true);

                            setTimeout(() => {
                              setIsCheck(false);
                            }, 2000);
                          }}
                        >
                          {isCheck && fileName === link.fileName
                            ? "Copied! ✔"
                            : "Copy Link"}
                        </button>
                      </div>
                    </LinkCard>
                  ) : null
                )
                .reverse()
            )}
          </LinkList>
        </Container>
      ) : (
        <LinkPage zipFiles={zipFiles} url={url} />
      )}
    </>
  );
};

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 480px) {
    font-size: 80%;
  }
`;

const LinkList = styled.div`
  padding: 1.5rem;
  //add scrollbar invisible
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  h1 {
    font-weight: bold;
  }

  p {
    letter-spacing: 0.06rem;
    padding-right: 4rem;
  }

  img {
    max-width: unset;
    height: unset;
    margin-bottom: -3rem;
    margin-right: -6rem;

    @media (max-width: 768px) {
      margin: 0;
      max-width: 100%;
      height: auto;
    }
  }

  @media (max-width: 768px) {
    margin: 1rem 0;
    max-width: 100%;
    height: auto;

    p {
      padding-right: 0;
    }
  }
`;

const LinkCard = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 32px 0 rgb(12 12 13 / 10%), 0 2px 16px 0 rgb(12 12 13 / 5%);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  img {
    margin: 0;
  }

  .name {
    display: flex;
    width: 100%;

    p {
      margin: 0;
      margin-left: 1rem;
    }

    button {
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      margin-left: auto;
      background-color: transparent;
      border: none;
    }
  }

  .expire {
    color: gray;
    p {
      margin: 0.5rem 0 1rem 0;
      font-size: 0.8rem;
    }

    div {
      height: 1px;
      width: 100%;
      background-color: lightgray;
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;

    button {
      margin-top: 0.5rem;
      background-color: transparent;
      border: none;
      color: #0060df;
    }
  }
`;

export default UploadPanel;
