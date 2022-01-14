import styled from "styled-components";
import Link from "next/link";

const DropzoneManager = ({
  getRootProps,
  getInputProps,
  isDragActive,
  isAuthenticated,
}) => {
  return (
    <DropzoneContainer {...getRootProps()}>
      <img src="assets/addFiles.svg" alt="addFile" />
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
  );
};

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

  @media (max-width: 768px) {
    padding: 5rem .5rem;
  }
`;

export default DropzoneManager;
