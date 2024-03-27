// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const PossibleDatesOfBirthPicker = () => {
//   const [age, setAge] = useState(0);
//   const [earliestBirthDate, setEarliestBirthDate] = useState(null);
//   const [latestBirthDate, setLatestBirthDate] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [proposalData, setProposalData] = useState({
//     birthDate: null
//   });

//   console.log(proposalData,selectedDate)

//   useEffect(() => {
//     const today = new Date();
//     const earliestDate = new Date(
//       today.getFullYear() - age - 1,
//       today.getMonth(),
//       today.getDate() + 1
//     );
//     const latestDate = new Date(
//       today.getFullYear() - age,
//       today.getMonth(),
//       today.getDate() - 1
//     );
//     setEarliestBirthDate(earliestDate);
//     setLatestBirthDate(latestDate);
//     setProposalData((prevState) => ({
//       ...prevState,
//       birthDate: selectedDate
//     }));
//   }, [age, selectedDate]);

//   return (
//     <div>
//       <h2>Select your date of birth:</h2>
//       <input
//         type="number"
//         value={age}
//         onChange={(e) => setAge(parseInt(e.target.value))}
//       />
//       <DatePicker
//         selected={selectedDate}
//         onChange={(date) => setSelectedDate(date)}
//         minDate={earliestBirthDate}
//         maxDate={latestBirthDate}
//         dateFormat="dd/MM/yyyy"
//         showYearDropdown
//         scrollableYearDropdown
//         yearDropdownItemNumber={15}
//       />
//     </div>
//   );
// };

// export default PossibleDatesOfBirthPicker;

// import React, { useState } from 'react';
// import './App.css'

// const CheckboxGroup = () => {
//   const [checkboxState, setCheckboxState] = useState({
//     option1: false,
//     option2: false,
//     option3: false,
//     option4: false
//   });

//   const handleCheckboxChange = (option) => {
//     // Function to handle checkbox change
//     setCheckboxState(prevState => ({
//       ...prevState,
//       [option]: !prevState[option]
//     }));

//     // Uncheck other options based on rules
//     if (option === 'option1' && checkboxState.option2) {
//       setCheckboxState(prevState => ({
//         ...prevState,
//         option2: false
//       }));
//     } else if (option === 'option2' && checkboxState.option1) {
//       setCheckboxState(prevState => ({
//         ...prevState,
//         option1: false
//       }));
//     } else if (option === 'option3') {
//       setCheckboxState(prevState => ({
//         ...prevState,
//         option1: false,
//         option2: false
//       }));
//     } else if (option === 'option4') {
//       setCheckboxState(prevState => ({
//         ...prevState,
//         option3: false,
//         option1: true,
//         option2: true
//       }));
//     }
//   };

//   return (
//     <div className="checkbox-group">
//       <label>
//         Option 1
//         <input
//           type="checkbox"
//           checked={checkboxState.option1}
//           onChange={() => handleCheckboxChange('option1')}
//           disabled={checkboxState.option4 || checkboxState.option3}
//         />
//       </label>
//       <br />
//       <label>
//         Option 2
//         <input
//           type="checkbox"
//           checked={checkboxState.option2}
//           onChange={() => handleCheckboxChange('option2')}
//           disabled={checkboxState.option4 || checkboxState.option3}
//         />
//       </label>
//       <br />
//       <label>
//         Option 3
//         <input
//           type="checkbox"
//           checked={checkboxState.option3}
//           onChange={() => handleCheckboxChange('option3')}
//           disabled={checkboxState.option4}
//         />
//       </label>
//       <br />
//       <label>
//         Option 4
//         <input
//           type="checkbox"
//           checked={checkboxState.option4}
//           onChange={() => handleCheckboxChange('option4')}
//         />
//       </label>
//     </div>
//   );
// };

// export default CheckboxGroup;

import React, { useState } from "react";
import d1 from "./assets/dice1.png";
import d2 from "./assets/dice2.png";
import d3 from "./assets/dice3.png";
import d4 from "./assets/dice4.png";
import d5 from "./assets/dice5.png";
import d6 from "./assets/dice6.png";

function DiceRoller() {
  const [numDice, setNumDice] = useState(1);
  const [diceResults, setDiceResults] = useState([]);
  const [sum, setSum] = useState(0);
  const [product, setProduct] = useState(0);
  const diceImages = [d1, d2, d3, d4, d5, d6];

  const rollDice = () => {
    const results = [];
    let rollSum = 0;
    let rollProduct = 1;
    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * 6) + 1;
      results.push(roll);
      rollSum += roll;
      rollProduct *= roll;
    }
    setDiceResults(results);
    setSum(rollSum);
    setProduct(rollProduct);
  };

  return (
    <div>
      <h2>Dice Roller</h2>
      <p>Sum: {sum}</p>
      <p>Product: {product}</p>
      <div>
        <label htmlFor="numDice">Number of Dice:</label>
        <input
          type="number"
          id="numDice"
          value={numDice}
          onChange={(e) => setNumDice(parseInt(e.target.value))}
          min={1}
          max={10}
        />
      </div>
      <button onClick={rollDice}>Roll Dice</button>
      <div>
        {diceResults.length > 0 && (
          <div>
            <p>
              {diceResults.map((result, index) => (
                <img
                  key={index}
                  src={diceImages[result - 1]} // Subtract 1 to match array index
                  alt={`Dice ${index + 1}`}
                  style={{ width: "50px", height: "50px", margin: "5px" }}
                />
              ))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiceRoller;
