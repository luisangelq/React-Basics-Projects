import styled from "styled-components";

const Search = () => {
  return (
    <Form>
      <div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm8.707 12.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
            fill="#4B587C"
            opacity="0.5"
          ></path>
        </svg>
        <input type="text" placeholder="Search"></input>
      </div>

      <button type="submit">Search</button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  align-items: center;
  margin: 0 2rem;

  div {
    display: flex;
    align-items: center;
    background: #f5f8ff;
    border-radius: 0.5rem;
    padding: 0 1.5rem;
  }
  input {
    background: #f5f8ff;
    border-radius: 5px;
    border: none;
    margin-left: 2rem;
    box-sizing: border-box;
    height: 40px;

    &:focus {
      outline: none;
    }

    @media (max-width: 480px) {
      width: 14rem;
    }
  }

  button {
    background: var(--btn-secondary);
    border: none;
    border-radius: 0.5rem;
    height: 3rem;
    margin-left: 1rem;
    color: var(--white);
    cursor: pointer;
  }
`;

export default Search;
