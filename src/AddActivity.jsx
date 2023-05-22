import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddActivity.css";
import Layout from "./Navbar/Layout";

const Form = () => {
  const navigation = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [data, setData] = useState({
    activityType: "",
    activityName: "",
    distance: "",
    activityDetail: "",
    startTime: "",
    finishTime: "",
    activityImage: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const postData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:8080/activity/add-activity",
      {
        activityName: data.activityName,
        activityType: data.activityType,
        startTime: data.startTime,
        finishTime: data.finishTime,
        activityDetail: data.activityDetail,
        activityImage: data.activityImage,
        distance: data.distance,
      },
      { headers: { authorization: `Bearer ${token}` } }
    );
    if (response.status === 200) {
      setData({
        activityType: "",
        activityName: "",
        distance: "",
        activityDetail: "",
        startTime: "",
        finishTime: "",
        activityImage: "",
      });
      alert(response.data.message);
      navigation("/Dashboard");
    }
  };

  // useEffect(() =>{
  //   postData()
  // },[]);

  const handleClick = (theActivity) => {
    setSelectedActivity(theActivity);
  };

  useEffect(
    () => setData({ ...data, activityType: selectedActivity }),
    [selectedActivity]
  );

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(data));
    setIsSubmit(true);
    postData();
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  const validate = (data) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!data.activityType) {
      errors.activityType = "Please select an activity type.";
    }
    if (!data.activityName) {
      errors.activityName = "Activity name is required!";
    }
    if (!data.activityDetail) {
      errors.activityDetail = "Activity detail is required!";
    }
    // if (!data.distance){
    //   errors.distance = "Distance is required!";
    // }
    if (!data.startTime) {
      errors.startTime = "Start time is required!";
    }
    if (!data.finishTime) {
      errors.finishTime = "Finish time is required!";
    }
    return errors;
  };
  return (
    <Layout>
      <div className="add-activity-container">
        <h1>Add Activity</h1>
        <h4>Select an activity</h4>

        <div className="activity-imgs">
          <button
            onClick={() => handleClick("Biking")}
            style={{
              backgroundColor: selectedActivity === "Biking" ? "white" : null,
            }}
          >
            <img src="./icons/bicycle.png" alt="biking" />
          </button>
          <button
            onClick={() => handleClick("Hiking")}
            style={{
              backgroundColor: selectedActivity === "Hiking" ? "white" : null,
            }}
          >
            <img src="./icons/hiking.png" alt="hiking" />
          </button>
          <button
            onClick={() => handleClick("Running")}
            style={{
              backgroundColor: selectedActivity === "Running" ? "white" : null,
            }}
          >
            <img src="./icons/running.png" alt="running" />
          </button>
          <button
            onClick={() => handleClick("Walking")}
            style={{
              backgroundColor: selectedActivity === "Walking" ? "white" : null,
            }}
          >
            <img src="./icons/walk.png" alt="walking" />
          </button>
          <button
            onClick={() => handleClick("Swimming")}
            style={{
              backgroundColor: selectedActivity === "Swimming" ? "white" : null,
            }}
          >
            <img src="./icons/swimming.png" alt="swimming" />
          </button>
        </div>
        <div id="error">
          <form onSubmit={handleSubmit} action="/">
            <div>
              <label id="activityType">Activity: {selectedActivity}</label>
              <br />
              <p id="type-error" className="error-message">
                {formErrors.activityType}
              </p>
            </div>
            <div>
              <label>Activity name</label>
              <br />
              <input
                type="text"
                name="activityName"
                value={data.activityName}
                onChange={handleChange}
              />
              <p className="error-message">{formErrors.activityName}</p>
            </div>
            <div>
              <label>Activity detail</label>
              <br />
              <input
                type="text"
                name="activityDetail"
                value={data.activityDetail}
                onChange={handleChange}
              />
              <p className="error-message">{formErrors.activityDetail}</p>
            </div>
            <div>
              <label>Start time</label>
              <br />
              <input
                type="datetime-local"
                name="startTime"
                value={data.startTime}
                onChange={handleChange}
              />
              <p className="error-message">{formErrors.startTime}</p>
            </div>
            <div>
              <label>Finish time</label>
              <br />
              <input
                type="datetime-local"
                name="finishTime"
                value={data.finishTime}
                onChange={handleChange}
              />
              <p className="error-message">{formErrors.finishTime}</p>
            </div>
            <div>
              <label>Distance (optional)</label>
              <br />
              <input
                type="number"
                name="distance"
                value={data.distance}
                placeholder="km"
                onChange={handleChange}
              />
              {/* <p className="error-message">{formErrors.distance}</p> */}
            </div>
            <div>
              <label>Attach an image</label>
              <br />
              <input
                type="file"
                name="file"
                value={data.file}
                onChange={handleChange}
              />
            </div>
            <button className="addNewActivity-btn" type="submit">
              {" "}
              Add New Activity{" "}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default Form;
