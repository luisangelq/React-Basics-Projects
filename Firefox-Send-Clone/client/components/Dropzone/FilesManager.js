import { useState } from "react";
import styled from "styled-components";

const FilesManager = ({ getRootProps, getInputProps, files, uploadFile }) => {
  const [passwordInput, setPasswordInput] = useState(false);

  const deleteFile = (fileId) => {
    
    

  }

  const filesLoop = files.map((file) => (
    <li key={file.fileId}>
      <img src="assets/documentIcon.svg" className="documentImg" />
      <div>
        <p className="fileName">
          {file.name.length > 18
            ? file.name.substring(0, 18) + "..."
            : file.name}
        </p>
        <p className="fileSize">
          {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
        </p>
      </div>

      <button
        onClick={() => deleteFile(file.fileId)}
      >
        <img src="assets/deleteIcon.svg" />
      </button>
    </li>
  ));

  const totalSize = files.reduce((total, file) => total + file.size, 0);
  return (
    <FilesContainer>
      <div className="filesList">
        <ul>{filesLoop}</ul>

        <div className="addFiles">
          <div className="addButton" {...getRootProps()}>
            <input {...getInputProps()} />
            <img src="assets/addFiles.svg" />
            <p>Select files to upload</p>
          </div>

          <label>
            Total size: {(totalSize / Math.pow(1024, 2)).toFixed(2)} MB{" "}
          </label>
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
          <input
            type="checkbox"
            onClick={() =>
              passwordInput ? setPasswordInput(false) : setPasswordInput(true)
            }
          />
          <label>Protect with password</label>

          {passwordInput ? (
            <input
              className="passwordInput"
              type="text"
              placeholder="Password"
            />
          ) : null}
        </div>

        <button
            onClick={() => uploadFile()}
        >Upload</button>
      </div>
    </FilesContainer>
  );
};

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
      height: 2rem;
      input {
        margin-right: 0.5rem;
        height: 1.5rem;
        width: 1.5rem;
        border: 1px solid #dae1e7;
        cursor: pointer;
      }

      .passwordInput {
        margin-left: 0.5rem;
        width: 15rem;
        padding: 1rem;
        background: #f9f9fa;
        border: 1px solid #dae1e7;
        border-radius: 0.3rem;
        color: #6c6c6d;
        cursor: text;
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

export default FilesManager;
