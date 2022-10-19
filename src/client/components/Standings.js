import React, { useState, useEffect } from 'react';

export const Standings = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch('https://api.sleeper.app/v1/league/863187571134541824/rosters')
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('this is standings', result);
          setIsLoaded(true);
          setTeams(result);
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

  let standings = teams.sort((a, b) => b.settings.wins - a.settings.wins);
  console.log('this is standings', standings);

  for (let i = 0; i < standings.length - 1; i++) {
    if (standings[i].settings.wins === standings[i + 1].settings.wins) {
      if (standings[i].settings.fpts > standings[i + 1].settings.fpts) {
        continue;
      } else {
        let current = standings[i];
        standings[i] = standings[i + 1];
        standings[i + 1] = current;
      }
    }
  }

  let pairs = [];

  for (let i = 0; i < standings.length; i++) {
    for (let j = 0; j < members.length; j++) {
      if (standings[i].owner_id === members[j].user_id) {
        pairs.push([members[j].display_name, members[j].user_id, i]);
        break;
      }
    }
  }
  console.log(standings);

  return (
    <div>
      <h1>Fantasy N' Chill Members</h1>
      <span>
        <ul>
          {standings.map((team) => (
            <div key={team.id}>
              {pairs.map((pair) =>
                pair[1] === team.owner_id ? (
                  <h3>
                    {pair[2]+1}.{'  '}Team Owner: {pair[0]}
                  </h3>
                ) : (
                  <p></p>
                )
              )}
              <span>Total Wins: {team.settings.wins}</span>{' '}
              <span>PF: {team.settings.fpts}</span>{' '}
              <span>PA: {team.settings.fpts_against}</span>
            </div>
          ))}
        </ul>
      </span>
    </div>
  );
};
