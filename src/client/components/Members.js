import React, { useState, useEffect } from 'react';

export const Members = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch('https://api.sleeper.app/v1/league/863187571134541824/users')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setMembers(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  console.log('this is memebers', members);
  return (
    <div>
      <h1>Fantasy N' Chill Members</h1>
      <ul>
        {members.map((members) => (
          <div key={members.id}>
            <h3>{members.display_name}</h3>
            <span>{members.metadata.team_name}</span>
          </div>
        ))}
      </ul>
    </div>
  );
};
