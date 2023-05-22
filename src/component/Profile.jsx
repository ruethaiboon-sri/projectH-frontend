import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";

const mockProfile = [
  {
    id: 1,
    name: "BaBaBi",
    height: 180,
    weight: 72,
  },
];

function Profile() {
  const [profile, setProfile] = useState(mockProfile);

  return (
    <div>
      {profile.map((profilee) => {
        return (
          <Card className="profilecard" key={profilee.id}>
            <Card.Img
              variant="top"
              src="src/images/profile.jpeg"
              className="profilepic"
            />
            <Card.Body>
              <Card.Title>{profilee.name}</Card.Title>
              <Card.Text>
                Height: {profilee.height} cm <br />
                Weight: {profilee.weight} kg <br />
              </Card.Text>
              <a href="/EditProfile">
                <Button variant="secondary" className="editbtn">
                  {" "}
                  <i className="fa-solid fa-pen-to-square" /> Edit Profile
                </Button>
              </a>
              <a href="/AddActivity">
                <Button variant="secondary" className="addbtn">
                  {" "}
                  <i className="fa-regular fa-square-plus" /> Add Activity
                </Button>
              </a>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default Profile;
