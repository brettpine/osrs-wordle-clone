import React, { useState, useEffect } from "react";
import "./App.css";
import Row from "./Row";

const App = () => {
    const words = ["SCAPE", "RUNES", "STEEL", "MAGIC", "MELEE", "RANGE", "SKILL"];
    const [targetWord, setTargetWord] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");
    const [isGameOver, setIsGameOver] = useState(false);
    const maxAttempts = 6;

    useEffect(() => {
        resetGame();
    }, []);

    const handleInputChange = (event) => {
        setCurrentGuess(event.target.value.toUpperCase());
    };

    const handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            handleGuess();
        }
    };

    const handleGuess = () => {
        if (currentGuess.length !== 5) {
            return;
        }

        const updatedGuesses = [...guesses, currentGuess];
        setGuesses(updatedGuesses);

        if (currentGuess === targetWord || updatedGuesses.length >= maxAttempts) {
            setIsGameOver(true);
        }
    };

    const resetGame = () => {
        setTargetWord(words[Math.floor(Math.random() * words.length)]);
        setGuesses([]);
        setCurrentGuess("");
        setIsGameOver(false);
    };

    return (
        <div className="main-container">
            <h1>RuneScape Wordle</h1>
            {guesses.map((guess, index) => (
                <Row key={index} guess={guess} targetWord={targetWord} />
            ))}
            {!isGameOver && (
                <>
                    <input
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        maxLength={5}
                        placeholder="Enter your guess"
                        value={currentGuess}
                    />
                    <button onClick={handleGuess}>Guess</button>
                </>
            )}
            {isGameOver && currentGuess !== targetWord && (
                <p>{`Game over! The word was: ${targetWord}`}</p>
            )}
            {isGameOver && <button className="reset" onClick={resetGame}>Reset</button>}
        </div>
    );
};

export default App;