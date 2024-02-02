import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '/src/App.css';

export const HomePageEmployee = () => {
  // Use useState hook to create state variables
  const [state, setState] = useState({
    step: 0,
    work_place_id: 0
  });

  // Assuming you have the Dropdown component defined as before
  const Dropdown = ({ options, onSelect }) => (
    <select onChange={(e) => onSelect(e.target.value)} value="">
      <option value="" disabled>
        בחר מקום עבודה
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );

  const options = [
    { id: 1, value: 'option1', label: 'Option 1' },
    { id: 2, value: 'option2', label: 'Option 2' },
  ];

  const handleOptionSelect = (selectedValue) => {
    // Update the 'step' and 'work_place_id' states using setState
    setState(prevState => ({ ...prevState, step: 1, work_place_id: selectedValue }));
  };

  // Use useEffect to log the state after it updates
  useEffect(() => {
    console.log('State:', state.step);
    console.log('Work Place ID:', state.work_place_id);
  }, [state]); // Only run the effect when 'state' changes

  // Switch statement outside the return
  let content;
  switch (state.step) {
    case 0:
      break;
    case 1:
      content = <h1>היייייי ... </h1>;
      break;
    default:
      break;
  }

  return (
    <>
      <h1>שלום ... </h1>
      <div>
        <h3>בחר מקום עבודה:</h3>
        <Dropdown options={options} onSelect={handleOptionSelect} />
        {content}
      </div>
    </>
  );
};

export default HomePageEmployee;
