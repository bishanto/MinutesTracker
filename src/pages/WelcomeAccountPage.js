import "./WelcomeAccountPageStyle.css";
import axios from 'axios';
import React, {useState} from 'react';
import NavbarComponent from "../components/NavbarComponent/NavbarComponent.js";
import { KidProfileButton } from "../components/KidProfileButton/KidProfileButton.js";
import { MathMinutesComponent } from "../components/MathMinutesComponent/MathMinutesComponent.js";
import { ReadingMinutesComponent } from "../components/ReadingMinutesComponent/ReadingMinutesComponent.js";

export const WelcomeAccountPage = () => {
  // Variables to test component loops
  const [tableData, setTableData] = useState([]);

  // Variables to access user data in localstorage
  let lsJSON = localStorage.getItem("userJSON");
  let userObj = JSON.parse(lsJSON);

  axios.get(`http://localhost:8081/statistics/adult/${userObj.userID}`).then(res => setTableData(res.data));

  return (
    <form>
      <NavbarComponent />
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
              id={data.sid}
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
                readingMinutes={data.weeklyReadMinutes}
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
                mathMinutes={data.weeklyMathMinutes}
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
