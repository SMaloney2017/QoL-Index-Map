import React from 'react';
import Slider from '@material-ui/core/Slider';

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([0, 6]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{width: "75%", padding: "20px" }}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        step={1}
        marks
        min={0}
        max={6}
      />
    </div>
  );
}