import React from 'react';

export const Entries = ({ people }) => {
  return (
    <ul>
      {people.map(person =>
        <li key={person.id}>{person.name} {person.number}</li>
      )}
    </ul>
  );
};