import "./settingsStyle.css";
import Navbar from "../components/Navbar/Navbar.js";
import { useState } from "react";
import { Link } from "react-router-dom";

{/* Note: some of the logic of the code will need to change in order for it to work with the actuak database*/}
const tableData = [
  {
    id: "1",
    firstNames: "Katrina",
    lastNames: "Woods",
    readMinutes: 25,
    mathMinutes: 120,
  },
  {
    id: "2",
    firstNames: "Khalid",
    lastNames: "Mcclure",
    readMinutes: 130,
    mathMinutes: 20,
  },
  {
    id: "3",
    firstNames: "Dora",
    lastNames: "Fitzgerald",
    readMinutes: 28,
    mathMinutes: 5,
  },
  {
    id: "4",
    firstNames: "Hollie",
    lastNames: "Kent",
    readMinutes: 213,
    mathMinutes: 42,
  },
  {
    id: "5",
    firstNames: "Jordan",
    lastNames: "Soloman",
    readMinutes: 65,
    mathMinutes: 125,
  },
];

const PopoutTable = ({ tableData, checkedRows, handleCheckboxChange, handleSubmit, handleCancel, isCheckboxChecked, handleMainCheckboxChange }) => {
  return (
    <div className="popout-container">
      {/* Create a table/pop-out for when you press the remove a profile button*/}
      <table className="popout-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.firstNames}</td>
              <td>{row.lastNames}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(row.id)}
                  checked={checkedRows.includes(row.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <label>
          Are you sure?
          <input type="checkbox" onChange={handleMainCheckboxChange} checked={isCheckboxChecked} />
        </label>
      </div>
      <div className="popout-buttons">
        <button onClick={handleSubmit} disabled={!isCheckboxChecked}>Submit</button>  
        <button onClick={handleCancel}>Stop Removing</button>
      </div>
    </div>
  );
};

export const SettingsPage = () => {
  const [checkedRows, setCheckedRows] = useState([]);
  const [showPopout, setShowPopout] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); 

  const handleCheckboxChange = (id) => {
    const isChecked = checkedRows.includes(id);
    if (isChecked) {
      setCheckedRows(checkedRows.filter((rowId) => rowId !== id));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

  {/* Will take out rows that are checked and return the rest to console. 
   NOTE: Will need to be changed when database is connected */}
  const handleSubmit = () => {
    const filteredData = tableData.filter((row) => !checkedRows.includes(row.id));
    console.log("Filtered data:", filteredData);
  };

  {/* Will close the popout*/}
  const handleCancel = () => {
    setShowPopout(false);
  };

  const handleMainCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  return (
    <div>
      <Navbar />
      <div className="first-button-div">
        <button className="button" onClick={() => setShowPopout(!showPopout)}>Remove a Profile</button>
      </div>
      {showPopout && (
        <div className="dim-overlay">
          <PopoutTable
            tableData={tableData}
            checkedRows={checkedRows}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            isCheckboxChecked={isCheckboxChecked}
            handleMainCheckboxChange={handleMainCheckboxChange} 
          />
        </div>
      )}
      <div>
        <Link to='/changepassword'>
          <button className="button">Change Password</button>
        </Link>
      </div>
    </div>
  );
};
