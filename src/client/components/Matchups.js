import React, { useState, useEffect } from 'react';

const Matchups = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [matchups, setMatchups] = useState([]);
  const [week, setWeek] = useState('');

  const handleSelect = (e) => {
    setIsLoaded(false);
    setWeek(e.target.value);
  };

  useEffect(() => {
    fetch(
      `https://api.sleeper.app/v1/league/863187571134541824/matchups/${week}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setMatchups(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [week]);

  let hashMap = {}; //stores the matchups of the current week
  let totalScores = {};
  let roster = {
    1: 'Nikul',
    2: 'Sanjay',
    3: 'Kush',
    4: 'Sam',
    5: 'Sudeep',
    6: 'Harsh',
    7: 'Somith',
    8: 'Snehansh',
    9: 'Evan',
    10: 'Mo',
    11: 'Ajit',
    12: 'Nihal',
  };

  //hashMap that stores the matchups of the current week
  for (let i = 0; i < matchups.length; i++) {
    let team = matchups[i];
    if (hashMap[team.matchup_id]) {
      hashMap[team.matchup_id].push(team.roster_id);
    } else {
      hashMap[team.matchup_id] = [team.roster_id];
    }
  }

  //harshMap that stores the total scores of the current team
  for (let i = 0; i < matchups.length; i++) {
    let team = matchups[i];
    const totalSum = (team) => {
      let counter = 0;
      for (let i = 0; i < team.starters_points.length; i++) {
        counter += team.starters_points[i];
      }
      return counter;
    };

    totalScores[team.roster_id] = totalSum(team);
  }

  return (
    <div>
      {Object.keys(hashMap).map((matchup, index) => (
        <div key={index}>
          <h3>
            {roster[hashMap[matchup][0]]} scored{' '}
            {totalScores[hashMap[matchup][0]].toFixed(2)} vs.{' '}
            {roster[hashMap[matchup][1]]} scored{' '}
            {totalScores[hashMap[matchup][1]].toFixed(2)}
          </h3>
        </div>
      ))}

      <select name="selectList" id="selectList" onChange={handleSelect}>
        <option value="">Select a Week</option> 
        <option value="1">Week 1</option> <option value="2">Week 2</option>
        <option value="3">Week 3</option> <option value="4">Week 4</option>
        <option value="5">Week 5</option> <option value="6">Week 6</option>
        <option value="7">Week 7</option> <option value="8">Week 8</option>
        <option value="9">Week 9</option> <option value="10">Week 10</option>
        <option value="11">Week 11</option> <option value="12">Week 12</option>
        <option value="13">Week 13</option> <option value="14">Week 14</option>
        <option value="15">Week 15</option> <option value="16">Week 16</option>
      </select>
    </div>
  );
};

export default Matchups;
