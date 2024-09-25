// InteriorsSelector.jsx
import React from 'react';

const InteriorsSelector = ({ interiors, selectedInteriors, setSelectedInteriors }) => {
  const handleCheckboxChange = (interior) => {
    if (selectedInteriors.includes(interior)) {
      setSelectedInteriors(selectedInteriors.filter(item => item !== interior));
    } else {
      setSelectedInteriors([...selectedInteriors, interior]);
    }
  };

  return (
    <div className="interiors-selector">
      {interiors.map((interior, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`interior-${index}`}
            checked={selectedInteriors.includes(interior)}
            onChange={() => handleCheckboxChange(interior)}
          />
          <label htmlFor={`interior-${index}`}>
            <img src={interior} alt={`Interior ${index}`} style={{ width: '50px', height: '50px' }} />
          </label>
        </div>
      ))}
    </div>
  );
};

export default InteriorsSelector;
