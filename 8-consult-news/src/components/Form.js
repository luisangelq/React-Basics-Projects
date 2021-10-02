import styled from "styled-components";
import useSelect from "../Hooks/useSelect";
import PropTypes from "prop-types";

const Form = ({ saveCategory }) => {
  const OPTIONS = [
    { value: "general", label: "General" },
    { value: "business", label: "Business" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health", label: "Health" },
    { value: "science", label: "Science" },
    { value: "sports", label: "Sports" },
    { value: "technology", label: "Technology" },
  ];

  const [category, SelectNews] = useSelect("general", OPTIONS);

  //when press submit, pass category to app.js
  const searchNews = (e) => {
    e.preventDefault();

    saveCategory(category);
  };

  return (
    <Search>
      <div className="col s12 m8 offset-m2">
        <form onSubmit={searchNews}>
          <Heading>Search news by category</Heading>

          <SelectNews />
          <div className="input-field col s12">
            <Btn type="submit" value="Search" />
          </div>
        </form>
      </div>
    </Search>
  );
};

const Search = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: left;
`;

const Heading = styled.h2`
  font-family: "Raleway", sans-serif;
  font-weight: 900;
  font-size: 2rem;
  text-transform: uppercase;
  text-align: center;
`;

const Btn = styled.input`
  background-color: #ffa000;
  color: white;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: all .3s ease-in-out;

    &:hover{
        background-color: #dc8a00;
    }
`;

Form.propTypes = {
  saveCategory: PropTypes.func.isRequired,
};

export default Form;
