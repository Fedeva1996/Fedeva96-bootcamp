const App = () => {
  const course = 'Half Stack application development'
  const partss = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const Header = ({ course }) => <h1>{course}</h1>;
  const Content = ({ parts}) => (
    <p>
      {parts[0].name} {parts[0].exercises}
      <br />
      {parts[1].name} {parts[1].exercises}
      <br />
      {parts[2].name} {parts[2].exercises}
    </p>
  );
  const Total = ({ parts }) => (
    <p>
      Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );

  return (
    <div>
      <Header course={course} />
      <Content parts={partss}/>
      <Total parts={partss} />
    </div>
  );
};

export default App;
