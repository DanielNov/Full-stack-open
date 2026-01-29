import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import Persons from "./components/Persons.jsx";
import axios from 'axios'
import personService from './services/persons.js'

const App = () => {
        const [persons, setPersons] = useState([])
        const [newName, setNewName] = useState('')
        const [newNumber, setNumber] = useState('')
        const [filter, setFilter] = useState('')

        useEffect(() => {
                personService
                        .getAll()
                        .then(initialPersons => {
                                setPersons(initialPersons)
                        })
        }, [])

        const filtered = persons.filter(person =>
                person.name.toLowerCase().includes(filter.toLowerCase()))

        const addPerson = (event) => {
                event.preventDefault()
                const sameNamePerson = persons.find(person => person.name === newName)
                if (sameNamePerson) {
                        const changedPerson = { ...sameNamePerson, number: newNumber }
                        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                                personService
                                        .update(changedPerson.id, changedPerson)
                                        .then(returnedPerson => {
                                                setPersons(persons.map(person => (person.name === newName ? returnedPerson : person)))
                                                setNewName('')
                                                setNumber('')
                                        })
                                        .catch(error => {
                                                console.log("Failed: ", error)
                                        })
                        }
                } else {
                        const personObj = {
                                name: newName,
                                number: newNumber
                        }
                        personService
                                .create(personObj)
                                .then(returnedPerson => {
                                        setPersons(persons.concat(returnedPerson))
                                        setNewName('')
                                        setNumber('')
                                })
                }
        }

        const deletePerson = id => {
                personService
                        .deletePerson(id)
                        .then(returnedPerson => {
                                setPersons(persons.filter(person => person.id !== id))
                        })
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
                        <Filter filter={filter} handleFilterChange={handleFilterChange} />
                        <h3>add a new</h3>
                        <PersonForm addPerson={addPerson}
                                newName={newName}
                                handlePersonChange={handlePersonChange}
                                newNumber={newNumber}
                                handleNumberChange={handleNumberChange}
                        />
                        <h3>Numbers</h3>
                        <Persons filtered={filtered} deletePerson={deletePerson} />
                </div>
        )
}

export default App
