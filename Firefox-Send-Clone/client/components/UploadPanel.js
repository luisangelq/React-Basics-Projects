import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Link from "next/link";

import axiosClient from "../config/axios";

const UploadPanel = ({ isAuthenticated }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    setFiles([acceptedFiles[0], ...files]);
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      const res = await axiosClient.post("/api/files", formData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const filesLoop = acceptedFiles.map((file) => (
    <li key={file.lastModified}>
      <img src="assets/documentIcon.svg" className="documentImg" />
      <div>
        <p className="fileName">{file.name}</p>
        <p className="fileSize">{(file.size / Math.pow(1024, 2)).toFixed(2) } MB</p>
      </div>

      <button>
        <img src="assets/deleteIcon.svg" />
      </button>
    </li>
  ));

  // const totalSize = files.reduce(
  //   (total, file) => total + file.size,
  //   0
  // );

  console.log(files);
  // console.log(totalSize);

  return (
    <Container>
      {!files.length > 0 ? (
        <DropzoneContainer {...getRootProps()}>
          <img src="assets/addFiles.svg" />
          <input {...getInputProps()} />
          {isDragActive ? (
            <h3>Drop Here</h3>
          ) : (
            <>
              <h3>Drag and drop files </h3>

              <p>or click to send up to {isAuthenticated ? "10MB" : "1MB"}</p>

              <button>Select files to upload</button>

              {!isAuthenticated ? (
                <Link href="/login">
                  <a {...getRootProps({ onClick: (e) => e.stopPropagation() })}>
                    Sign in to send up to 10MB
                  </a>
                </Link>
              ) : null}
            </>
          )}
        </DropzoneContainer>
      ) : (
        <FilesContainer>
          <div className="filesList">
            <ul>{filesLoop}</ul>

            <div className="addFiles">
              <div className="addButton" {...getRootProps()}>
                <input {...getInputProps()} />
                <img src="assets/addFiles.svg" />
                <p>Select files to upload</p>
              </div>

              <label>Total size: </label>
            </div>
          </div>

          <div className="fileConfig">
            <div className="fileExpires">
              <label>Expires after</label>
              <select>
                <option value="1">1 download</option>
                <option value="2">2 downloads</option>
                <option value="3">3 downloads</option>
                <option value="5">5 downloads</option>
                <option value="10">10 downloads</option>
                <option value="20">20 downloads</option>
                <option value="50">50 downloads</option>
                <option value="100">100 downloads</option>
              </select>
              <label>or</label>
              <select defaultValue={"86400"}>
                <option value="300">5 minutes</option>
                <option value="3600">1 hour</option>
                <option value="86400">1 day</option>
                <option value="604800">7 days</option>
              </select>
            </div>

            <div className="filePassword">
              <input type="checkbox" />
              <label>Protect with password</label>
            </div>

            <button>Upload</button>
          </div>
        </FilesContainer>
      )}

      <LinkList>
        <h1>Simple, private file sharing</h1>
        <p>
          Firefox Send lets you share files with end-to-end encryption and a
          link that automatically expires. So you can keep what you share
          private and make sure your stuff doesn’t stay online forever.
        </p>
        <img src="assets/IntroImage.svg" alt="intro" />
      </LinkList>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DropzoneContainer = styled.div`
  border-style: dashed;
  border-color: #b1b1b3;
  border-width: 2px;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    height: 3rem;
  }

  h3 {
    margin-top: 1.5rem;
    letter-spacing: 0.07rem;
  }
  p {
    margin: 0.5rem 0 2rem 0;
  }

  button {
    background-color: #0060df;
    color: #fff;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #003eaa;
    }
  }

  a {
    margin-top: 1rem;
    color: #0060df;
    font-weight: 550;
    font-size: 0.8rem;
  }
`;

const FilesContainer = styled.div`
  .filesList {
    background-color: #f9f9fa;
    ul {
      padding: 1rem;
      margin: 0;
      list-style: none;
      height: 20rem;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 0;
      }

      li {
        display: flex;
        background-color: white;
        padding: 0.8rem 1.5rem;
        margin-bottom: 0.5rem;
        border-radius: 0.3rem;
        box-shadow: 0 0 8px 0 rgb(12 12 13 / 10%);

        .documentImg {
          height: 2rem;
          margin-right: 1rem;
          @media (max-width: 480px) {
            display: none;
          }
        }

        div {
          display: flex;
          flex-direction: column;

          width: 100%;
          gap: 0.3rem;

          .fileName {
            margin: 0;
            font-weight: 600;
            font-size: 0.9rem;
          }
          .fileSize {
            margin: 0;
            font-weight: 400;
            font-size: 0.85rem;
            opacity: 0.75;
          }

          @media (max-width: 480px) {
            align-items: center;
            margin: 1rem 0;
          }
        }

        button {
          background-color: transparent;
          border: none;
          padding: 0.5rem;

          img {
            height: 1rem;
          }
        }

        @media (max-width: 480px) {
          flex-direction: column;
        }
      }
    }

    .addFiles {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      align-items: center;

      .addButton {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;

        img {
          height: 1.5rem;
        }

        p {
          margin: 0;
          font-weight: 600;
        }
      }

      @media (max-width: 480px) {
        flex-direction: column;
      }
    }
  }

  .fileConfig {
    .fileExpires {
      display: flex;
      align-items: center;
      padding: 0.25rem;
      margin: 1rem 0;
      gap: 0.5rem;

      select {
        padding: 0.3rem 0;
        background: #f9f9fa;
        background-position: calc(100% - 0.75rem);
        border: 1px solid #dae1e7;
        border-radius: 0.3rem;
        color: #6c6c6d;
      }

      @media (max-width: 480px) {
        flex-direction: column;
      }
    }

    .filePassword {
      display: flex;
      align-items: center;
      input {
        margin-right: 0.5rem;
        height: 1.5rem;
        width: 1.5rem;
        border: 1px solid #dae1e7;
        cursor: pointer;
      }
    }

    button {
      width: 100%;
      background-color: #0060df;
      padding: 1rem;
      outline: none;
      border: none;
      border-radius: 0.5rem;
      color: #fff;
      margin-top: 1.5rem;
    }
  }
`;

const LinkList = styled.div`
  margin: 2rem 1rem 0 1rem;

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }

  p {
    letter-spacing: 0.02rem;
    padding-right: 4rem;
  }

  img {
    max-width: unset;
    height: unset;
    margin-bottom: -3rem;
    margin-right: -7rem;

    @media (max-width: 768px) {
      margin: 0;
      max-width: 100%;
      height: auto;
    }
  }
`;

export default UploadPanel;
