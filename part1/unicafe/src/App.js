import { useState } from "react";

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let all = good + neutral + bad;
  let average = (good - bad) / all;
  let positive = (good / all) * 100;

  const Statistic = ({ text, value }) => (
    <p>
      {text}: {value}
    </p>
  );
  const Statistics = () => {
    if (all === 0) return <p>No feedback given</p>;
    else
      return (
        <div>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={all} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positive} />
        </div>
      ); 
  };

const Button = ({ text, onClick }) => (
    <button onClick={onClick}>{text}</button>
)

  return (
    <div>
      <h1>Give feedback</h1>
      <p>
        <Button onClick={() => setGood(good + 1)} text="Good"/>
        <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button onClick={() => setBad(bad + 1)} text="Bad" />
      </p>
      <Statistics />
    </div>
  );
};

export default App;
