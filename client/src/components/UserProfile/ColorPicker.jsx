
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './ColorPicker.css';

const ColorPicker = () => {
  const [color, setColor] = useState('#fff');
  const navigate = useNavigate();

  const handleChangeComplete = (color) => {
    setColor(color.hex);
    document.body.style.backgroundColor = color.hex;
  };

  return (
    <div className="color-picker-container">
      <Button onClick={() => navigate(-1)} className="back-button">Back</Button>
      <SketchPicker
        color={color}
        onChangeComplete={handleChangeComplete}
      />
    </div>
  );
};

export default ColorPicker;
