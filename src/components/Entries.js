import React from 'react';

const Entry = ({ person, onDelete }) => {
  return (
    <li key={person.id}>{person.name} {person.number}
      <button onClick={() => onDelete(person.id)}>Delete</button>
    </li>
  )
}

export const Entries = ({ people, onDelete }) => {
  return (
    <ul>
      {people.map(person =>
        <Entry key={person.id} person={person} onDelete={onDelete} />
      )}
    </ul>
  );
};