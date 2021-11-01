import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";

const Home: NextPage = ({ pokemon }) => {
  // console.log(pokemon);
  const [counter, setCounter] = useState(0);
  const [inputState, setInputState] = useState("");
  const [storageState, setStorageState] = useState({});

  const handleChange = (e: ChangeEvent) => {
    setInputState(e.target.value);
  };

  const handleSubmit = (e: SubmitEvent) => {
    // e.preventDefault();
    e.preventDefault();

    if (window) {
      localStorage.setItem(JSON.stringify(counter), inputState);
    }

    document.cookie = `${counter}=${inputState}; expires=Thu, 01 Nov 2021 10:30:00 UTC`;

    setCounter((prevCount) => prevCount + 1);
    setInputState("");
  };

  const handleGetStorage = () => {
    for (let i = 0; i < counter; i++) {
      setStorageState((prevState) => {
        let newState: any = { ...prevState };
        newState[i] = localStorage.getItem(JSON.stringify(i));
        return newState;
      });
    }
  };

  const handleSendRequest = async () => {
    const res = await fetch("/api/hello?query=hej");
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <input className="myInput" type="text" />
      <hr />
      <form onSubmit={handleSubmit}>
        <input
          className="addToLocalInput"
          value={inputState}
          type="text"
          onChange={handleChange}
        />
        <button className="addToLocalBtn" type="submit">
          Add to storage
        </button>
      </form>
      <button onClick={handleGetStorage}>Get from storage</button>
      <pre>{JSON.stringify(storageState)}</pre>
      <button onClick={handleSendRequest}>Send request</button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
        {pokemon.map((mon) => (
          <div key={mon.id}>
            <div>{mon.name}</div>
            <img src={mon.sprites.front_default} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0"
  );
  const data = await res.json();

  let pokemon = [];
  for (let i = 0; i < data.results.length; i++) {
    const res: any = await fetch(data.results[i].url);
    const newData = await res.json();
    pokemon.push(newData);
  }

  console.log(pokemon);
  return {
    props: {
      pokemon,
    },
  };
};

export default Home;
