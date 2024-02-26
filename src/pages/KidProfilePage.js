//npm install react-calendar used
import "./styleSheet.css";
import React, { useState } from "react";
import Calendar from 'react-calendar';
import Navbar from "../components/Navbar/Navbar";

export const KidProfilePage = () => {   
    //create calendar
    const[value, setValue] = useState(new Date());
    function onChange(nextValue) {
        setValue(nextValue);
    }

    return(
        <form>
            <Navbar />
            <h1>Kid's Profile</h1>
                <div>
                    Name: FirstName LastName<br />
                    
                    <h3><a href='/dragonstatistics'>Progress</a></h3><br />
                    
                    Add to progress:
                    {/*create a dropdown menu here for subject*/}
                    <select id = "selection">
                        <option value = "">
                            Select Class
                        </option>
                        
                        <option value = "Math">
                            Math
                        </option>
                        
                        <option value = "Reading">
                            Reading
                        </option>
                        
                    </select>
                    {/*display calendar*/}
                    <Calendar onChange={onChange} value={value} />
                    
                </div>
        </form>
    )
}