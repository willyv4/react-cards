import axios from "axios";
import Card from "./Card";
import { useState, useEffect } from "react";

const Deck = () => {
  const [deck, setDeck] = useState();

  useEffect(() => {
    async function getDeck() {
      const res = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      setDeck(res.data.deck_id);
    }
    if (!deck) {
      getDeck();
    }
  }, [deck]);

  return <>{deck && <Card deck={deck} />}</>;
};

export default Deck;
