const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Using props to pass data",
        exercises: 10,
      },
      {
        name: "Fundamentals of React",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const Header = ({ course }) => <h1>{course}</h1>;
  const Part = ({ part, exercises }) => (
    <p>
      {part} {exercises}
    </p>
  );
  const Content = ({ parts }) => (
    <div>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
    </div>
  );

  const Total = ({ exercises }) => (
    <p>
      Number of exercises:{" "}
      {exercises[0].exercises + exercises[1].exercises + exercises[2].exercises}
    </p>
  );

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>
  );
};

export default App;
