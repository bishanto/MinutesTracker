import "./styleSheet.css";
import React, { useState, useEffect, useRef } from "react";
import { Collapse } from 'react-bootstrap';
import Calendar from 'react-calendar';
import axios from 'axios';
import NavbarComponent from "../components/NavbarComponent/NavbarComponent.js";
import { useParams } from 'react-router-dom';

export const KidProfilePage = () => {   
    
	const ref = useRef();
	const { id } = useParams();
	const [activity, setActivity] = useState('Reading');
	const [bookTitle, setBookTitle] = useState('');
	const [minutes, setMinutes] = useState('');
	const [text, setText] = useState('Reading');
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(true);
	const [rBtnDisabled, setRBtnDisable] = useState(true);
	const [mBtnDisabled, setMBtnDisable] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false); // Add a state to track form submission

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsSubmitting(true); // Set isSubmitting to true when form is submitted
		try {
		const response = await axios.post(`/KidProfilePage/${id}`, { studentId: id, activity, minutes }); // Send studentId as part of the request body
		console.log(response.data);
		setActivity('Reading');
		setBookTitle('');
		setMinutes('');
		} catch (error) {
		console.error('Error submitting minutes:', error);
		} finally {
		setIsSubmitting(false); // Reset isSubmitting after request is complete
		};
	
	}
	
	useEffect(() => {
		
		ref.current.style.color = "blue";
		
	}, []);
	
	function readingFunc() {
		
		setActivity('Reading');
		setOpen2(true);
		setMinutes('');
		setRBtnDisable(true);
		setMBtnDisable(false);
		setText('Reading');
		ref.current.style.color = "blue";
		
	}
	
	function mathFunc() {
		
		setActivity('Math');
		setOpen2(false);
		setBookTitle('');
		setMinutes('');
		setRBtnDisable(false);
		setMBtnDisable(true);
		setText('Math');
		ref.current.style.color = "red";
		
	}
	
	//create calendar
    const[value, setValue] = useState(new Date());
    function onChange(nextValue) {
        setValue(nextValue);
    }

    return(
		<div>
			<NavbarComponent />
			<h3>ID: {id}</h3>
			<h2>Current Day Selected: Month / Day / Year</h2> <br/>
			<button onClick={() => setOpen1(!open1)} aria-expanded={open1}>View Calendar</button> <br/><br/>
			<Collapse in={open1}>
				<div>
					<Calendar onChange={onChange} value={value} />
				</div>
			</Collapse> <br/>
			<form onSubmit={handleSubmit}>
			<h4  ref = {ref}>Activity: {text}</h4>
			
			<button onClick={readingFunc} disabled = {rBtnDisabled}>Reading</button><button onClick={mathFunc} disabled = {mBtnDisabled}>Math</button><br/><br/>
			<Collapse in={open2}>
				<div>
					<label>Book Title:</label><input value={bookTitle} onChange={(event) => setBookTitle(event.target.value)}/><br/><br/>
				</div>
			</Collapse> <br/>
			<label>
			  Minutes:
			  <input
				type="number"
				value={minutes}
				onChange={(event) => setMinutes(event.target.value)}
			  />
			</label><br/>
			<button type="submit" disabled={!id || isSubmitting}>Submit</button> {/* Disable button if studentId is null or form is submitting */}
			</form>
    </div>
    );
}
