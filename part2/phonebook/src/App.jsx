import {useState} from "react";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import Persons from "./components/Persons.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [filter, setFilter] = useState('')

    const filtered = persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase()))

    const addPerson = (event) => {
        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            event.preventDefault()
            console.log("button clicked")
            setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}))
            setNewName('')
        }
    }

    const handlePersonChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setFilter(event.target.value)
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange}/>
            <h3>add a new</h3>
            <PersonForm addPerson={addPerson}
                        newName={newName}
                        handlePersonChange={handlePersonChange}
                        newNumber={newNumber}
                        handleNumberChange={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Persons filtered={filtered}/>
        </div>
    )
}

export default App