import React, { useEffect, useState } from "react";
import "./App.css";
import ImageList from "./components/ImageList";

const showError = (message) => {
  const errorPopup = document.createElement("div");
  errorPopup.className = "error-popup";
  const errorText = document.createTextNode(message);
  errorPopup.appendChild(errorText);
  document.body.appendChild(errorPopup);

  setTimeout(() => {
    document.body.removeChild(errorPopup);
  }, 2000);
};

const App = () => {
  const [breeds, setBreeds] = useState([]);
  const [breed, setBreed] = useState("");
  const [links, setLinks] = useState([
    <div>
      <img
        src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=834&q=80"
        alt=""
        id="photo"
        width="800"
        height="690"
      />
    </div>,
  ]);
  const [number, setNumber] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => {
        const fetchBreeds = Object.entries(data.message).flatMap(
          ([breed, subBreeds]) =>
            subBreeds.length > 0
              ? subBreeds.map((subBreed) => `${breed}/${subBreed}`)
              : breed
        );
        setBreeds(fetchBreeds);
      });
  }, []);

  const onOptionChangeHandler = (event) => {
    console.log("User Selected Value - ", event.target.value);
    setBreed(event.target.value);
  };

  const onNumberChangeHandler = (event) => {
    const inputValue = event.target.value;
    const parsedValue = parseInt(inputValue);
    setNumber(parsedValue);
  };

  const changeState = () => {
    if (breed == "" || breed == "Select Breed") {
      showError("Please select breed");
    } else if (number < 1 || number > 100) {
      showError("Number should be between 1 and 100");
    } else {
      setLinks(<ImageList breed={breed} number={number} />);
    }
  };

  return (
    <>
      <center className="container">
        <div className="title">
          <h1>
            Doggie
            <br /> Database
          </h1>

          <h3>Find photos of your favorite dogs</h3>
          <p>
            *All breeds may not contain the desired amount of images, if so max
            will be displayed*
          </p>
        </div>

        <div className="search">
          <select onChange={onOptionChangeHandler}>
            <option>Select Breed</option>
            {breeds.map((option, index) => (
              <option key={index} id={index} value={option}>
                {option.replace("/", " ").toUpperCase()}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Enter number(1-100)"
            value={number}
            onChange={onNumberChangeHandler}
          />
          <br />
          <button onClick={changeState}>Show Images</button>
        </div>
      </center>

      <div id="gallery" className="image-grid">
        {links}
      </div>
    </>
  );
};

export default App;
