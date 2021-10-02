import { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

import Weather from "./Weather";
import Spinner from "./Spinner";

const Form = ({ search, setSearch, data, setData }) => {
  const { city, country } = search;

  const [loading, setLoading] = useState(false);

  const consultApi = async () => {
    setLoading(true);
    const appId = "60adb92347f691c73b75f466c7570e79";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;
    const response = await fetch(url);
    const result = await response.json();

    //check for correct results
    if (result.cod === "404") {
      Swal.fire({
        icon: "error",
        title: result.message.toUpperCase(),
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    }

    setTimeout(() => {
      setData(result);
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "" || country.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "All Fields Are Required",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    consultApi();
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="city"
            id="city"
            placeholder="New York"
            value={city}
            onChange={(e) => setSearch({ ...search, city: e.target.value })}
          />
          <label htmlFor="city">City: </label>
        </div>

        <select
          name="country"
          className="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          value={country}
          onChange={(e) => setSearch({ ...search, country: e.target.value })}
        >
          <option value="" disabled="disabled">
            Country:{" "}
          </option>
          <option value="US">United States</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">Spain</option>
          <option value="PE">Perú</option>
        </select>

        {/* <Weather data={data} /> */}
        {loading ? <Spinner /> : <Weather data={data} />}

        <Button type="submit" value="Get The Weather" />
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

const Button = styled.input`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  margin-top: 3rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #f7b146;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e8991f;
  }
`;

export default Form;
