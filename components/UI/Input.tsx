// Input.tsx
import React from 'react';

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ label, type, name, value, onChange }) => {
  return (
    <div className="form-field">
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="form-input"
      />
    </div>
  );
};

export default Input;
