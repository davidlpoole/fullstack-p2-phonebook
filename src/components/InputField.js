import React from 'react';


export const InputField = ({ htmlFor, label, type, value, onChange }) => {
  return (
    <div className='input'>
      <label htmlFor={htmlFor}>
        {label}
      </label>
      <input
        type={type}
        id={htmlFor}
        value={value}
        onChange={onChange} />
    </div>
  );
};
