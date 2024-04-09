const Course = ({ course }) => (
    <div>
      <h1>{course.name}</h1>
      <p>
        {course.parts.map((part) => (
          <p>
            {part.name}: {part.exercises}
          </p>
        ))}
      </p>
      <strong>Total of {total(course.parts)} exercises</strong>
    </div>
  );
  const total = (parts) => parts.reduce((sum, part) => sum + part.exercises, 0);
  
  export default Course;