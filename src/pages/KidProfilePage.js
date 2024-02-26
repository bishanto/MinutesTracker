import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar.js';
import { useParams } from 'react-router-dom';

export function KidProfilePage() {
  const { id } = useParams();
  const [activity, setActivity] = useState('Reading');
  const [minutes, setMinutes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Add a state to track form submission

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Set isSubmitting to true when form is submitted
    try {
      const response = await axios.post(`/KidProfilePage/${id}`, { studentId: id, activity, minutes }); // Send studentId as part of the request body
      console.log(response.data);
      setActivity('Reading');
      setMinutes('');
    } catch (error) {
      console.error('Error submitting minutes:', error);
    } finally {
      setIsSubmitting(false); // Reset isSubmitting after request is complete
    }
  };

  return (
    <div>
      <Navbar />
      <p>ID: {id}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Choose Activity:
          <select value={activity} onChange={(event) => setActivity(event.target.value)}>
            <option value="Reading">Reading</option>
            <option value="Math">Math</option>
          </select>
        </label>
        <label>
          Minutes:
          <input
            type="number"
            value={minutes}
            onChange={(event) => setMinutes(event.target.value)}
          />
        </label>
        <button type="submit" disabled={!id || isSubmitting}>Submit</button> {/* Disable button if studentId is null or form is submitting */}
      </form>
    </div>
  );
}
