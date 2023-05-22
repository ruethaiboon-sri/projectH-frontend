import React, { useState, useEffect } from "react";
import Layout from "./Navbar/Layout";
import axios from "axios";
import "./EditProfile.css";
// import runicon from './images/runicon.png'
// import goalicon from './images/goalicon.png'
import myPhoto from "./images/myPhoto.jpg";

function EditProfile() {
  // const test = 50
  const username = "Hello";
  const [user, setUser] = useState("");
  const [newProfile, setNewProfile] = useState({
    firstname: "",
    lastname: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState({});
  const [bmi, setBmi] = useState("");
  const [db, setDb] = useState([]);
  const [adviseWeights, setAdviseWeights] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const fetchProfile = await axios.get(
          "http://localhost:8080/user/64672035e688b9ab998ac495"
        );
        setUser(fetchProfile.data);
      } catch (err) {}
    };
    getProfile();
  }, []);

  function editProfileHandler() {
    setEditMode(true);
  }

  function profileChangeHandler({ target }) {
    const { name, value } = target;
    setNewProfile((prev) => ({ ...prev, [name]: value }));
  }

  async function saveEditProfile() {
    const { firstname, lastname } = newProfile;
    const requestChange = await axios.put(
      "http://localhost:8080/user/edit-profile/64672035e688b9ab998ac495",
      {
        firstname,
        lastname,
      }
    );
    setUser(requestChange.data);
    setNewProfile({ firstname: "", lastname: "" });
    alert("Edit Success!");
    setEditMode(false);
  }

  function submitEditProfile() {
    saveEditProfile();
  }

  function handlerChange({ target }) {
    const { name, value } = target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  function checkInput() {
    let status = true;
    for (const data in input) {
      if (input[data] === "") {
        status = false;
        break;
      }
    }
    return status;
  }

  function calAdviseWeight(height) {
    const adviseWeight = 20 * (height / 100) ** 2;
    setAdviseWeights(adviseWeight.toFixed(0));
  }

  function handlerFocus() {
    if (Object.keys(input).length === 2 && checkInput()) {
      const weight = input.weight;
      const height = input.height;
      const BMI = weight / (height / 100) ** 2;
      setBmi(BMI.toFixed(2));
      calAdviseWeight(height);
    }
  }

  function handlerSubmit(e) {
    e.preventDefault();
    const idLatest = db.length === 0 ? 1 : db[db.length - 1].id;
    setDb((prev) => [...prev, { id: idLatest + 1, ...input }]);
    setInput({});
    console.log(db);
  }

  return (
    <Layout>
      <div className="body-formpage">
        <div className="form-box">
          {/* <input type='file' /> */}
          <img
            className="user-photo"
            src={myPhoto}
            style={{ width: "150px" }}
          />
          <h2>
            {user.firstname}
            &nbsp;
            {user.lastname}
          </h2>
          {!editMode && <button onClick={editProfileHandler}>Edit</button>}
          {editMode === true && (
            <>
              <button onClick={submitEditProfile}>Save</button>
              <label>
                First Name
                <input
                  type="text"
                  placeholder={user.firstname}
                  name="firstname"
                  value={newProfile.firstname || ""}
                  onChange={profileChangeHandler}
                />
              </label>
              <label>
                Last Name
                <input
                  type="text"
                  placeholder={user.lastname}
                  name="lastname"
                  value={newProfile.lastname || ""}
                  onChange={profileChangeHandler}
                />
              </label>
            </>
          )}
          <input
            className="weight"
            name="weight"
            placeholder="weight in Kg"
            value={input.weight || ""}
            onChange={handlerChange}
            onBlur={handlerFocus}
          />
          <input
            className="height"
            name="height"
            placeholder="height in Cm"
            value={input.height || ""}
            onChange={handlerChange}
            onBlur={handlerFocus}
          />
          <p className="BMI">
            Your BMI
            <br />
            <b>{bmi}</b>
          </p>
          <p>Your advise weight is {adviseWeights} Kg</p>
          {/* <input className='setGoal' /> */}
          {/* <div className='goal-status'>
            <span className='runner-box'>
              <div >
                <img className='runner' src={runicon} style={{}} />
              </div>
              <div className='runner-status'></div>
            </span>
            <span>
              <img className='goal' src={goalicon} />
            </span>
          </div>
          <div className='start-weight'>start {console.log(db)}</div> */}
          <button onClick={handlerSubmit}>Save</button>
        </div>
      </div>
    </Layout>
  );
}

export default EditProfile;
