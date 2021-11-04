import React, { useState, useEffect } from "react"
import { deleteEntry, searchFoodItem } from './store';
import { useSelector, useDispatch } from 'react-redux';
import Input from './components/Input'
import Table from "./components/Table";

const container = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: "sans-serif",
  fontSize: 20,
}

const header = {
  fontSize: 25,
  margin: 10
}

const foodHints = ["Tofu", "Chicken", "Beef", "Salmon", "Cabbage", "Sword Fish", "Turtle", "Apple", "Ostrich",]

const getHint = () => foodHints[Math.floor(Math.random() * foodHints.length)];

const App = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [grams, setGrams] = useState(50)
  const [hint, setHint] = useState(getHint)
  const entries = useSelector(state => state.entries);
  const total = useSelector(state => state.total);
  const message = useSelector(state => state.message);
  const searching = useSelector(state => state.searching);
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      setHint(getHint())
    }, 5000);
  }, [])

  const onClick = (entry) => {
    dispatch(deleteEntry(entry))
  }

  return (
    <div style={container}>
      <div style={header}>
        {props.title}
      </div>
      <Input
        inputValue={searchTerm}
        inputPlaceholder={`Search ${hint}`}
        selectValue={grams}
        selectMin={1}
        selectMax={200}
        selectIncrement={1}
        disabled={searching}
        onSelectChange={setGrams}
        onInputChange={setSearchTerm}
        onClick={() => {
          dispatch(searchFoodItem(searchTerm, grams))
          setSearchTerm("")
        }}
      />
      {message && <p>{message}</p>}
      {entries.length > 0 &&
        <Table
          headers={["", "", "Calories"]}
          entries={entries}
          footers={["", "Total", total]}
          onDelete={onClick}
        />
      }
    </div>
  )
}
export default App;