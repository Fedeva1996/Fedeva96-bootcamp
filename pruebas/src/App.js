import { useState } from "react";

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>  
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => () => {
    console.log('value now', newValue)  // imprime el nuevo valor en la consola
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <Button onClick={setToValue(1000)} text={1000}/>
      <Button onClick={setToValue(0)} text={0}/>
      <Button onClick={setToValue(value + 1)} text={'Aumentar en 1'}/>
    </div>
  )
}

export default App;
