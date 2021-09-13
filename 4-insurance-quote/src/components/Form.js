import { useState } from "react";
import Result from "./Result";
import {
  getYearDifference,
  incrementByContinent,
  incrementByPlan,
} from "../helper";
import Swal from "sweetalert2";
import styled from "styled-components";

const Form = ({result, setResult }) => {
  const [formData, setFormData] = useState({
    continent: "",
    year: "",
    plan: "",
  });

  const { continent, year, plan } = formData;

  //Read form data
  const getData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fillSelect = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 10; i <= currentYear; i++) {
      years.push(i);
    }
    return years.reverse();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validate form
    if (continent === "" || year === "" || plan === "") {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "All fields Are Required",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    //Calculate insurance
    let price = 2000;

    const yearDifference = getYearDifference(year);

    price = price - (yearDifference * 3 * price) / 100;
    price = incrementByContinent(continent) * price;
    price = incrementByPlan(plan) * price;

    setResult({
      formData,
      price,
    });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Field>
          <Label>Continent</Label>
          <Select name="continent" value={continent} onChange={getData}>
            <option value="">Select Continent</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
          </Select>
        </Field>

        <Field>
          <Label>Year</Label>
          <Select name="year" value={year} onChange={getData}>
            <option value="">Select Year</option>
            {fillSelect().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </Field>

        <Field>

          <Label>Plan</Label>
          <Radio
            type="radio"
            name="plan"
            value="basic"
            checked={plan === "basic"}
            onChange={getData}
          />{" "}
          Basic
          <Radio
            type="radio"
            name="plan"
            value="premium"
            checked={plan === "premium"}
            onChange={getData}
          />{" "}
          Premium
        </Field>

        <Result result={result} />


        <Button type="submit" value="Get Quote" />
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 0.5rem;
`;

const Field = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
background-color: rgba(255, 255, 255, 0.8);
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  -webkit-appearance: none;
  outline: none;
  text-align: center;
`;

const Radio = styled.input`
  margin: 0 1rem;
`;

const Button = styled.input`
  width: 100%;
  font-size: 16px;
  margin-top: 3rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #916001;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #6d4902;
  }
`;
export default Form;
