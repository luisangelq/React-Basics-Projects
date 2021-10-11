import styled from "styled-components";

const Project = ({ project }) => {
  return (
    <li>
      <Btn type="button">{project.name}</Btn>
    </li>
  );
};

const Btn = styled.button`
  margin-top: 1rem;
  font-family: var(--headingFont);
  padding: 1.5rem;
  font-size: 1.4;
  font-weight: 400;
  border-radius: 0.5rem;
  border: none;
  transition: background-color 0.3s ease;
  display: block;
  background-color: transparent;
  cursor: pointer;
`;

export default Project;
