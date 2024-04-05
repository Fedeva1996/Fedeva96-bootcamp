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
  return (
    <div>
      <h1>give feedback</h1>
      <p>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </p>
      <Statistics />
    </div>
  );
};

export default App;
