import React, { useState, useEffect} from 'react';
import Quote from './components/Quote';
import Spinner from '../src/components/Spinner';

const initialQuote ={
  text: 'Empty',
  author: 'Gilbert'
};

function App() {

  const [quote, setQuote] = useState(initialQuote);
  const [loading, setLoading] = useState(false);



  const updateQ = async () =>{
    setLoading(true);
    const url = "https://www.breakingbadapi.com/api/quote/random";
    const res = await fetch(url);
    const [newQuote] = await res.json();

    const {quote: text, author} = newQuote;
  

    setQuote({
      text,
      author
    })

    setLoading(false);
  }

  useEffect(()=>{
    updateQ();
  },[])

  return (
    <div className="app">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"
        alt="logo"
      />

      <button onClick={()=> updateQ()}>Get Another One</button>

      { loading ? <Spinner/> :  <Quote quote={quote}/> }
    </div>
  );
}

export default App;
