import { TemperatureUnit } from '../types/weather';

interface TemperatureToggleProps {
  unit: TemperatureUnit;
  onToggle: (unit: TemperatureUnit) => void;
}

export default function TemperatureToggle({ unit, onToggle }: TemperatureToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onToggle('celsius')}
        className={`btn ${unit === 'celsius' ? 'btn-primary' : 'btn-outline'}`}
        aria-pressed={unit === 'celsius'}
      >
        °C
      </button>
      <button
        onClick={() => onToggle('fahrenheit')}
        className={`btn ${unit === 'fahrenheit' ? 'btn-primary' : 'btn-outline'}`}
        aria-pressed={unit === 'fahrenheit'}
      >
        °F
      </button>
    </div>
  );
}