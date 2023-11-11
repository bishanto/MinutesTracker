import "./WelcomeAccountPageStyle.css";
import Navbar from "../components/Navbar/Navbar";
import { KidProfileButton } from "../components/KidProfileButton/KidProfileButton";
import { MathMinutesComponent } from "../components/MathMinutesComponent/MathMinutesComponent";
import { ReadingMinutesComponent } from "../components/ReadingMinutesComponent/ReadingMinutesComponent";

export const WelcomeAccountPage = () => {
  // Variables to test component loops
  const accountFirstName = "FirstName";
  const accountLastName = "LastName";
  const tableData = [
    { firstNames: "Katrina", lastNames: "Woods", readMinutes: 25, mathMinutes: 120 },
    { firstNames: "Khalid", lastNames: "Mcclure", readMinutes: 130, mathMinutes: 20 },
    { firstNames: "Dora", lastNames: "Fitzgerald", readMinutes: 28, mathMinutes: 5 },
    { firstNames: "Hollie", lastNames: "Kent", readMinutes: 213, mathMinutes: 42 },
    { firstNames: "Jordan", lastNames: "Soloman", readMinutes: 65, mathMinutes: 125 }
  ];

  return (
    <form>
      <Navbar />
      <h1>
        Welcome {accountFirstName} {accountLastName}!
      </h1>
      <div className="container-row">
        {/* Render button for every name in list*/}
        <div className="container-col">
          <h2>Profile</h2>
          {tableData.map((data, index) => (
            <KidProfileButton
              key={index}
              firstName={data.firstNames}
              lastName={data.lastNames}
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
