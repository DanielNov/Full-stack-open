import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
};

const Anecdote = ({ anecdotes, votes}) => { 
  return (
    <div>
      <div>{anecdotes}</div>
      <div>has {votes} votes</div>
    </div>
  );
};

const Title = ({ text }) => { return <div><h1>{text}</h1></div>};

const MostVotes = ({ anecdotes, max}) => { 
  return (
    <div>
      <div>{anecdotes}</div>
      <div>has {max} votes</div>
    </div>
  );
};
  


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleVoteClick = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };


  const handleNextAnecdoteClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const max = Math.max(...votes);
  const indexOfMax = votes.indexOf(max);

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Anecdote anecdotes={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleVoteClick} text="vote" />
      <Button onClick={handleNextAnecdoteClick} text="next anecdote" />
      <Title text="Anecdote with most votes" />
      <MostVotes anecdotes={anecdotes[indexOfMax]} max={max} />
    </div>
  );
};

export default App;