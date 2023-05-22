import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import axios from "axios";

const mockCard = [
  {
    id: 1,
    type: "Running",
    name: "Running with U",
    description: "Running in the morning",
    start: "19-04-23:19.01",
    end: "19-04-23:19.11",
    duration: 6000,
    distance: 2000,
  },
  {
    id: 2,
    type: "Walking",
    name: "Walking with me",
    description: "Walking in the morning",
    start: "19-04-23:19.01",
    end: "19-04-23:19.11",
    duration: 6000,
    distance: 2000,
  },
  {
    id: 3,
    type: "Biking",
    name: "Biking with myself",
    description: "Biking in the morning",
    start: "19-04-23:19.01",
    end: "19-04-23:19.11",
    duration: 6000,
    distance: 2000,
  },
  {
    id: 4,
    type: "Hiking",
    name: "Hiking with U",
    description: "Hiking in the morning",
    start: "19-04-23:19.01",
    end: "19-04-23:19.11",
    duration: 6000,
    distance: 2000,
  },
  {
    id: 5,
    type: "Swimming",
    name: "Swimming with U",
    description: "Swimming in the morning",
    start: "19-04-23:19.01",
    end: "19-04-23:19.11",
    duration: 6000,
    distance: 2000,
  },
  {
    id: 6,
    type: "Running",
    name: "Running with him",
    description: "Running in the morning",
    start: "19-04-23:19.01",
    end: "19-04-23:19.11",
    duration: 6000,
    distance: 2000,
  },
  {
    id: 7,
    type: "Walking",
    name: "Walking with U",
    description: "Walking in the morning",
    start: "19-04-23:19.01",
    end: "19-04-23:19.11",
    duration: 6000,
    distance: 2000,
  },
  {
    id: 8,
    type: "Biking",
    name: "Biking with me",
    description: "Biking in the morning",
    start: "19-04-23:19.01",
    end: "19-04-23:19.11",
    duration: 6000,
    distance: 2000,
  },
  {
    id: 9,
    type: "Hiking",
    name: "Hiking with her",
    description: "Hiking in the morning",
    start: "19-04-23:19.01",
    end: "19-04-23:19.11",
    duration: 6000,
    distance: 2000,
  },
  {
    id: 10,
    type: "Swimming",
    name: "Swimming with U",
    description: "Swimming in the morning",
    start: "19-04-23:19.01",
    end: "19-04-23:19.11",
    duration: 6000,
    distance: 2000,
  },
  {
    id: 11,
    type: "Hiking",
    name: "Hiking with her",
    description: "Hiking in the morning",
    start: "19-04-23:19.01",
    end: "19-04-23:19.11",
    duration: 6000,
    distance: 2000,
  },
];

const typeIconMap = {
  Running: "fa-person-running",
  Walking: "fa-person-walking",
  Swimming: "fa-person-swimming fa-flip-horizontal",
  Biking: "fa-person-biking",
  Hiking: "fa-person-hiking",
};

const typeImgMap = {
  Running: "src/images/elder-running.jpeg",
  Walking: "src/images/elder-walking.jpeg",
  Swimming: "src/images/elder-swimming.jpeg",
  Biking: "src/images/elder-biking.jpeg",
  Hiking: "src/images/elder-hiking.webp",
};

function Activitycard() {
  const [card, setCard] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      const token = localStorage.getItem('token');
      const responseData = await axios.get(
        "http://localhost:8080/activity/userdata", {
          headers: {
            authorization: `Bearer ${token}`,
          }
        }
      );
      setCard([...responseData.data]);
      console.log(responseData.data);
    }
    fetchdata();
  }, []);

  const deletePost = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      console.log(id);
      axios
        .delete(`http://localhost:8080/activity/delete/${id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      window.location.reload();
    }
  };

  return (
    <Row className="cardrow">
      {card.map((cardd) => (
        <Card className="activitycard" key={cardd._id}>
          <Card.Img
            variant="top"
            className="activitypic"
            src={`${typeImgMap[cardd.activityType]}`}
          />
          <Card.Body>
            <Card.Title className="cardtitle">
              {cardd.activityName} &nbsp;
              <span className="typetext">{cardd.activityType}&nbsp;</span>
              <i
                className={`fa-solid ${
                  typeIconMap[cardd.activityType]
                } fa-2xl actype`}
                title={cardd.activityType}
              />
            </Card.Title>
            <Card.Text>
              {cardd.activityDetail}{" "}
              {/* <<<<<<<<<<<<<<<Add description here<<<<<<<<<<<<<<< */}
              <br />
              <br />
              <i className="fa-solid fa-calendar-days fa-2xl acdetail"></i>
              &nbsp; &nbsp; Start {cardd.startDate}{" "}
              {/* <<<<<<<<<<<<<<<Add start here<<<<<<<<<<<<<<< */}
              <br />
              <br />
              <i className="fa-solid fa-flag-checkered fa-2xl acdetail"></i>
              &nbsp; &nbsp; End {cardd.endDate}{" "}
              {/* <<<<<<<<<<<<<<<Add end here<<<<<<<<<<<<<<< */}
              <br />
              <br />
              <i className="fa-solid fa-stopwatch fa-2xl acdetail"></i>
              &nbsp; &nbsp;
              {/* {cardd.duration}{" "} */}
              {/* <<<<<<<<<<<<<<<Add duration here<<<<<<<<<<<<<<< */}
              <br />
              <br />
              <i className="fa-solid fa-route fa-2xl acdetail"></i>
              &nbsp; &nbsp;
              {cardd.distance}{" "}
              {/* <<<<<<<<<<<<<<<Add distance here<<<<<<<<<<<<<<< */}
              <br />
              <br />
              <br />
            </Card.Text>
            <a href={`/EditActivity/${cardd._id}`}>
              <Button variant="outline-success" className="editactivitybtn">
                <i className="fa-solid fa-pen-to-square fa-2xl" />
              </Button>
            </a>
            <Button
              onClick={() => deletePost(cardd._id)}
              variant="outline-danger"
              className="deleteactivitybtn"
            >
              <i className="fa-solid fa-trash fa-2xl"></i>
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Row>
  );
}

export default Activitycard;
