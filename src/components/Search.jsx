import { useState } from "react"
import { useGlobalContext } from "../context"

const Search = () => {

  const [text, setText] = useState('');
  const {setSearchTerm, fetchRandomMeal} = useGlobalContext();

  const handleChange = (e) => {
      setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(text) {
      setSearchTerm(text);
    }
  }

  const handleRandomMeal = () => {
    setSearchTerm('');
    setText('');
    fetchRandomMeal();
  }

  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="search for meal"className="form-input"  onChange={handleChange} value={text}/>
        <button className="btn" type="submmit">Search</button>
        <button className="btn btn-hipster" type="button" onClick={handleRandomMeal}>suprise me!</button>
      </form>
    </header>
  )
}

export default Search