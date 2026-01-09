import React, { useState } from 'react'


function SearchBar({onSearch}) {
   const [query, setQuery] = useState('');
    const handlerInputChange = (e) => {
        setQuery(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(query.trim()){
            onSearch(query);
        }
        setQuery('');
    } ;  




  return (
    <div >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handlerInputChange}
          placeholder="Search for recipes..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchBar
