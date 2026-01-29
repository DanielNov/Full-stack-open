const Persons = ({ filtered, deletePerson }) => {

        const handleDelete = (id, name) => {
                if (window.confirm(`Delete ${name}`)) {
                        deletePerson(id)
                }
        }
        return (
                <>
                        {filtered.map(person =>
                                <div key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>delete</button></div>
                        )}
                </>
        )
}

export default Persons;
