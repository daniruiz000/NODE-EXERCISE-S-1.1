import "./App.css";
import React from "react";
//jhgsdfhs
function App() {
  const API_URL = "https://node-exercise-s-2-1-and-2-2.vercel.app/book";
  const [books, setBooks] = React.useState();

  React.useEffect(() => {
    fetch(API_URL)
      .then((books) => books.json())
      .then((booksParsed) => setBooks(booksParsed));
  }, []);

  return (
    <div className="App">
      <h2>Libros</h2>
      <ul>
        {books?.data.map((book) => {
          return (
            <li key={book._id}>
              {book.title}({book.author.name})
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
