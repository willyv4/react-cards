import { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ deck }) => {
  const [cards, setCards] = useState([]);
  const [cardCount, setCardCount] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    let intervalId;

    async function getCard() {
      const res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
      );

      if (res.data.cards[0].image !== undefined) {
        setCards((prevCards) => [...prevCards, res.data.cards[0].image]);
        setCardCount(res.data.remaining);
      }
    }

    console.log(cardCount);

    if (isDrawing && (cardCount > 0 || cardCount === undefined)) {
      intervalId = setInterval(getCard, 100);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [deck, isDrawing, cardCount]);

  useEffect(() => {
    if (cardCount === 0) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      setIsDrawing(false);
    }
  }, [cardCount]);

  const handleStartDrawing = () => {
    setIsDrawing(true);
    if (cardCount === 0) {
      setShowMessage(true);
    }
  };

  const handleStopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <>
      <div className="flex justify-center">
        {isDrawing ? (
          <button
            className="bg-rose-300 p-2 w-36 rounded text-center"
            onClick={handleStopDrawing}
          >
            Stop Drawing
          </button>
        ) : (
          <button
            className="bg-emerald-300 p-2 w-36 rounded text-center"
            onClick={handleStartDrawing}
          >
            Start Drawing
          </button>
        )}

        {showMessage && (
          <h1 className="bg-amber-300 p-2 w-36 rounded text-center">
            Out Of Cards!
          </h1>
        )}
      </div>
      <div>
        {cards.map((c, i) => (
          <img
            className="absolute inset-0 flex items-center justify-center"
            key={`${i}-card`}
            src={c}
            alt={"card"}
          />
        ))}
      </div>
    </>
  );
};

export default Card;
