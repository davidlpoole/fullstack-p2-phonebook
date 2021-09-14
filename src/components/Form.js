import React from 'react';
import { InputField } from "./InputField";

export const Form = ({ onSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>

      <InputField
        htmlFor='name'
        label='Name: '
        type='text'
        value={newName}
        onChange={handleNameChange} />

      <InputField
        htmlFor='number'
        label='Number: '
        type='text'
        value={newNumber}
        onChange={handleNumberChange} />

      <button className='add' type="submit">Add</button>
    </form>
  );
};
