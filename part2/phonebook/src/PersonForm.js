const PersonForm = ({handleSubmit, handleName, handleNumber, newName, newNumber}) => (
    <form onSubmit={handleSubmit}>
        <div>
          Name: <input onChange={handleName} value={newName} />
        </div>
        <div>
          Number: <input onChange={handleNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

export default PersonForm;