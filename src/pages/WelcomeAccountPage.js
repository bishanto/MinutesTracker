import "./WelcomeAccountPageStyle.css";
import axios from 'axios';
import React, {useState} from 'react';
import Navbar from "../components/Navbar/Navbar";
import { KidProfileButton } from "../components/KidProfileButton/KidProfileButton";
import { MathMinutesComponent } from "../components/MathMinutesComponent/MathMinutesComponent";
import { ReadingMinutesComponent } from "../components/ReadingMinutesComponent/ReadingMinutesComponent";

export const WelcomeAccountPage = () => {
  // Variables to test component loops
  const accountID = 4; // hardcoded for testing purposes
  const accountFirstName = "FirstName";
  const accountLastName = "LastName";
  const [tableData, setTableData] = useState([]);

  // Variables to access user data in localstorage
  let lsJSON = localStorage.getItem("userJSON");
  let userObj = JSON.parse(lsJSON);

  axios.get(`http://localhost:8081/statistics/adult/${accountID}`).then(res => setTableData(res.data));

  return (
    <form>
      <Navbar />
      <h1>
        Welcome {userObj.fname} {userObj.lname}!
      </h1>
      <div className="container-row">
        {/* Render button for every name in list*/}
        <div className="container-col">
          <h2>Profile</h2>
          {tableData.map((data, index) => (
            <KidProfileButton
              key={index}
              firstName={data.firstName}
              lastName={data.lastName}
            />
          ))}
        </div>

        {/* Render reading minutes*/}
        <div className="container-col">
          <h2 className="align">Reading</h2>
          {tableData.map((data, index) => (
            <div className="min-container">
              <ReadingMinutesComponent
                key={index}
                readingMinutes={data.readMinutes}
              />
            </div>
          ))}
        </div>

        {/* Render math minutes*/}
        <div className="container-col">
          <h2 className="align">Math</h2>
          {tableData.map((data, index) => (
            <div className="min-container">
              <MathMinutesComponent
                key={index}
                mathMinutes={data.mathMinutes}
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
