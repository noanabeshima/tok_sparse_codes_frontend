import React, { useEffect, useState, useRef } from 'react';
import './tokens.json'
import './SearchBar.css'



function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const currentUrl = window.location.href.split('/').slice(0, 1)[0]
  console.log(currentUrl)

  const abortController = useRef(new AbortController());

  useEffect(() => {
    abortController.current.abort();
    abortController.current = new AbortController();

    if (query === '') {
        setResults([]);
        return;
    }

    if (query) {
        console.log('query', query)
        const apiUrl = 'https://tok-embed-nnmf-api-489e56c40ef7.herokuapp.com/get_suggestions?q=' + query
        fetch(apiUrl, { signal: abortController.current.signal })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(data => {
                console.log('data', data)
                setResults(data)
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted')
                } else {
                    console.error('There has been a problem with your fetch operation:', error)
                }
            })

    } else {
        setResults([]);
    }
    }, [query]);

    const getUrl = (result) => {
        return `${currentUrl}/code/${result}`
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (results.length > 0) {
                // navigate
                window.location.href = getUrl(results[0])
            }
        }
    }


  return (
    <div className="search-container">
      <input 
        className="search-bar"
        type="text" 
        value={query} 
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
        { query !== "" && <div className="search-splitter"/>}
        {results.map((result, index) => (
            <div className="search-result" key={index}>
                <a className="search-result-link" href={getUrl(result)}>{result.replace(/ /g, '∘').replace(/\n/g, '↵')}</a>
            </div>
        ))}
        { query !== "" && <div className="search-bottom-padding"/>}
    </div>
  );
}

export default SearchBar;
