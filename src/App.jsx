import { useEffect, useState } from "react";
import "./App.css";

let pokemons = [
  "pikachu",
  "charizard",
  "bulbasaur",
  "squirtle",
  "charmander",
  "jigglypuff",
  "mewtwo",
  "snorlax",
  "eevee",
  "gyarados",
  "dragonite",
  "mew",
  "gengar",
  "lugia",
  "rayquaza",
  "lucario",
  "articuno",
  "vaporeon",
  "gardevoir",
  "blaziken",
];

function App() {
  const [artList, setArtList] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [highest, setHighest] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const promises = pokemons.map(async (name) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`,
          {
            mode: "cors",
          }
        );
        const data = await response.json();

        return {
          name: name[0].toUpperCase() + name.slice(1),
          url: data.sprites.other.dream_world.front_default,
        };
      });
      const resolvedArtList = await Promise.all(promises);
      setArtList(resolvedArtList);
    }

    fetchData();
  }, []);

  function clickHandler(name) {
    if (clicked.includes(name)) {
      setScore(0);
      setClicked([]);
    } else {
      if (score + 1 > highest) {
        setHighest(score + 1);
      }
      setClicked((prev) => [...prev, name]);
      setScore(score + 1);
    }
    const shuffle = shuffleArray(artList);
    setArtList(shuffle);
  }

  const cardList = artList.map((art) => (
    <Card
      key={art.name}
      name={art.name}
      url={art.url}
      onClick={() => clickHandler(art.name)}
    />
  ));
  return (
    <>
      <div className="board">
        <h1>Score : {score}</h1>
        <h1>Highest : {highest}</h1>
      </div>
      <div className="container">{cardList}</div>;
    </>
  );
}

function Card({ name, url, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={url} alt={name} />
      <h1>{name}</h1>
    </div>
  );
}

function shuffleArray([...array]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default App;
