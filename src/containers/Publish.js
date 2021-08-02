import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import Login from "./Login";

const Publish = ({ userToken, setUser }) => {
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        `https://lereacteur-vinted-api.herokuapp.com/publish`,
        formData,
        { headers: { authorization: `Bearer ${userToken}` } }
      );
      console.log(response.data);
      console.log("Token ===> " + response.data);

      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      }

      setData(response.data);
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  return userToken ? (
    // <p>Vous êtes connecté</p>
    <section id="Publish-main">
      <div class="Publish-container">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          <div class="File-select">
            <input
              type="file"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setPicture(event.target.files[0]);
              }}
            />
          </div>
          <div class="Text-input-section">
            <div class="Text-input">
              <h4>Titre</h4>
              <input
                name="title"
                id="title"
                type="text"
                value={title}
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => setTitle(event.target.value)}
              ></input>
            </div>

            <div class="Text-input">
              <h4>Décris ton article</h4>
              <textarea
                name="description"
                id="description"
                value={description}
                rows="5"
                placeholder="ex: porté quelquefois, taille correctement"
                spellCheck="false"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
          </div>

          <div class="Text-input-section">
            <div class="Text-input">
              <h4>Marque</h4>
              <input
                type="text"
                name="Brand"
                id="brand"
                value={brand}
                placeholder="ex: Levis"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              ></input>
            </div>

            <div class="Text-input">
              <h4>Taille</h4>
              <input
                type="text"
                name="Size"
                id="size"
                value={size}
                placeholder="ex: M/40/10"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              ></input>
            </div>

            <div class="Text-input">
              <h4>Couleur</h4>
              <input
                type="text"
                name="Color"
                id="color"
                value={color}
                placeholder="ex: blue"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              ></input>
            </div>

            <div class="Text-input">
              <h4>Etat</h4>
              <input
                type="text"
                name="wearRate"
                id="wearRate"
                value={condition}
                placeholder="ex: Neuf avec étiquette"
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              ></input>
            </div>

            <div class="Text-input">
              <h4>Lieu</h4>
              <input
                type="text"
                name="Location"
                id="location"
                value={city}
                placeholder="ex: Paris"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              ></input>
            </div>
          </div>

          <div class="Text-input-section">
            <div class="Text-input">
              <h4>Prix</h4>
              <div class="Checkbox-section">
                <input
                  type="text"
                  id="price"
                  value={price}
                  name="Price"
                  placeholder="ex: 0,00€"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                ></input>
              </div>
              <div class="Checkbox-input">
                <input
                  type="checkbox"
                  name="Exchange"
                  id="exchange"
                  value="exchange"
                ></input>
                <span>Je suis intéressé(e) par les échanges</span>
              </div>
            </div>
          </div>

          <p>{errorMessage} </p>

          <div class="Form-button">
            <button type="submit" class="Publish-button">
              Ajouter
            </button>
          </div>
        </form>
        {data && <img src={data.secure_url} alt="" />}
      </div>
    </section>
  ) : (
    // <p>Vous devez être connecté</p>
    <Login />
  );
};

export default Publish;
