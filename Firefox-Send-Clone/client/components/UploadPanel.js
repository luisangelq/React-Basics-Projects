import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import shortId from "shortid";
import JSZip from "jszip";

import styled from "styled-components";
import { errorAlert, goToSignUp } from "./AlertHandler";

import DropzoneManager from "./Dropzone/DropzoneManager";
import FilesManager from "./Dropzone/FilesManager";

import FilesContext from "../context/files/filesContext";
import LinkPage from "./LinkPage";

const UploadPanel = ({ isAuthenticated }) => {
  const {
    files,
    zipFiles,
    links,
    url,
    loading,
    setFileFn,
    deleteFileFn,
    uploadZipFileFn,
    loadingFn,
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
      return;
    }

    if (isAuthenticated && totalSize > 1024 * 1024 * 10) {
      errorAlert({ msg: "Files Exceed 10MB" });
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
    const d = new Date(date);
    const day = d.getDay();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();



    console.log(day);

    return `Hola`;
  }

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
                .map((link) => (
                  <LinkCard>
                    <div className="name">
                      <img
                        src="assets/documentIcon.svg"
                        className="documentImg"
                      />
                      <div>
                        <p>{link.fileName}</p>
                        <p className="fileSize">
                          {(link.size / Math.pow(1024, 2)).toFixed(2)} MB
                        </p>
                      </div>

                      <button>
                        <img src="assets/deleteIcon.svg" />
                      </button>
                    </div>
                    <div className="expire">
                      <p>
                        Expires after {link.downloads} downloads or{" "}
                        {
                          formatDate(link.expires)
                        }
                      </p>

                      <span></span>
                    </div>
                    <div className="3"></div>
                  </LinkCard>
                ))
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
  margin: 2rem 1rem 0 1rem;

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
`;

export default UploadPanel;
