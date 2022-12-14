import './App.css';
import { useState, useEffect, setLoading, setError } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutView from './components/AboutView';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SearchView from './components/SearchView';
import MovieView from './components/MovieView';
import NotFound from './components/NotFound';

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
 

  useEffect(() => {
    if(searchText) {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=6408207b6c2cee35072b57aafee8b2a5&language=en-US&query=${searchText}&page=1&include_adult=false`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setSearchResults(data.results)
      })
    }
  }, [searchText])

   
    
  return (
    <div>
      <Navbar searchText={searchText} setSearchText={setSearchText}/>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about" component={AboutView} />
        <Route path="/search" >
          <SearchView keyword={searchText} searchResults={searchResults}/>
        </Route>
        <Route path="/movie/:id" component={MovieView} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
