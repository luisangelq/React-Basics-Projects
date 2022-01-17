import { useState, useContext } from "react";
import styled from "styled-components";
import FilesContext from "../context/files/filesContext";

const LinkPage = ({ zipFiles, url }) => {
  const [isCheck, setIsCheck] = useState(false);

  const { cleanStateFn } = useContext(FilesContext);
  return (
    <LinkContainer>
      <h2>Your file is encrypted and ready to send</h2>

      <div>
        <p>Copy the link to share your file:</p>
        <p>{zipFiles[0].name}</p>
      </div>

      <input
        type="text"
        disabled="disabled"
        value={`${process.env.frontendURL}/downloads/${url}`}
      />

      <div className="btnContainer">
        <button
          onClick={() => {
            // copy link to clipboard
            navigator.clipboard.writeText(
              `${process.env.frontendURL}/downloads/${url}`
            );
            setIsCheck(true);

            setTimeout(() => {
              setIsCheck(false);
            }, 2000);
          }}
        >
        {isCheck ? "Copied! ✔" : "Copy Link"}
        </button>
        <button onClick={cleanStateFn} className="ok">OK</button>
      </div>
    </LinkContainer>
  );
};

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 500px;
  margin: 0 auto;
  gap: 1rem;

  h2 {
    font-size: 2.5rem;
    /* text-align: center; */
  }

  p {
    text-align: center;
    margin: 0.5rem;
    color: gray;
  }

  input {
    width: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid lightgray;
    background-color: #fff;
    font-weight: bold;
    text-align: center;
    cursor: text;
  }

  .btnContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    button {
      width: 100%;
      padding: 1rem;
      border-radius: 0.5rem;
      border: none;
      outline: none;
      background-color: #0060df;
      color: #fff;
      transition: all 0.2s ease-in-out;
    }

    .ok {
      background-color: #fff;
      color: #0060df;
      width: 5rem;
      margin: 0 auto;
    }
  }

  @media (max-width: 768px) {
    font-size: 80%;
    width: 100%;
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export default LinkPage;
