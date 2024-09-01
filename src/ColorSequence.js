import React, { useState, useEffect } from 'react';
import './ColorSequence.css';

function ColorSequence() {
  const initialColors = [
    "#3A99A8", "#573E3C", "#D0894D", "#D282A4",
    "#DCBD40", "#82A653", "#704678", "#A14752", "#235077"
  ];

  const [colors, setColors] = useState(initialColors);
  const [buttonPositions, setButtonPositions] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [currentColor, setCurrentColor] = useState(1);

  useEffect(() => {
    shuffleColorsAndPositions();
  }, []);

  const shuffleColorsAndPositions = () => {
    const shuffledColors = [...initialColors].sort(() => Math.random() - 0.5);
    const shuffledPositions = [...buttonPositions].sort(() => Math.random() - 0.5);
    setColors(shuffledColors);
    setButtonPositions(shuffledPositions);
    resetButtons();
    setCurrentColor(1);
  };

  function resetButtons() {
    for (let i = 1; i <= 9; i++) {
      document.getElementById(`btn${i}`).style.backgroundColor = "white";
    }
  }

  function change(buttonId, correctColor) {
    const button = document.getElementById(buttonId);

    if (correctColor === colors[currentColor - 1]) {
      button.style.backgroundColor = correctColor;
      if (currentColor === 9) {
        setTimeout(() => {
          alert("You win!");
          shuffleColorsAndPositions();
        }, 500);
      } else {
        setCurrentColor(currentColor + 1);
      }
    } else {
      resetButtons();
      setCurrentColor(1);
    }
  }

  return (
    <>
    <h1>Color Sequence</h1>
      <div className="spacing"></div>
      <div className="color-picker">
        {colors.map((color, index) => (
          <button key={index} style={{ backgroundColor: color }} />
        ))}
      </div>
      <div className="spacing"></div>

      <div className="button-change">
        {buttonPositions.slice(0, 3).map((pos, index) => (
          <button key={`btn${pos + 1}`} id={`btn${pos + 1}`} onClick={() => change(`btn${pos + 1}`, colors[pos])} />
        ))}
      </div>
      <div className="button-change">
        {buttonPositions.slice(3, 6).map((pos, index) => (
          <button key={`btn${pos + 1}`} id={`btn${pos + 1}`} onClick={() => change(`btn${pos + 1}`, colors[pos])} />
        ))}
      </div>
      <div className="button-change">
        {buttonPositions.slice(6).map((pos, index) => (
          <button key={`btn${pos + 1}`} id={`btn${pos + 1}`} onClick={() => change(`btn${pos + 1}`, colors[pos])} />
        ))}
      </div>

      <div className="spacing"></div>
      <button className="restart-button" onClick={shuffleColorsAndPositions}>Restart</button>
    </>
  );
}

export default ColorSequence;

// Stream TTPD and Talaarawan