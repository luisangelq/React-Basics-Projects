import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Link from "next/link";

import axiosClient from "../config/axios";

const UploadPanel = ({ isAuthenticated }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    console.log(acceptedFiles);

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

  return (
    <Container>
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
                <a {...getRootProps({ onClick: e => e.stopPropagation() })} >Sign in to send up to 10MB</a>
              </Link>
            ) : null}
          </>
        )}
      </DropzoneContainer>

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
  grid-template-columns: 1fr 1fr;
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
