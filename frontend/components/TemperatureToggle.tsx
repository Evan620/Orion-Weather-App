import React from 'react';
import { TemperatureUnit } from '../types/weather';

interface TemperatureToggleProps {
  unit: TemperatureUnit;
  onToggle: (unit: TemperatureUnit) => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer flex gap-2">
        <span className="label-text">°C</span>
        <input 
          type="checkbox" 
          className="toggle toggle-primary" 
          checked={unit === 'fahrenheit'}
          onChange={() => onToggle(unit === 'celsius' ? 'fahrenheit' : 'celsius')}
        />
        <span className="label-text">°F</span>
      </label>
    </div>
  );
};

export default TemperatureToggle;
