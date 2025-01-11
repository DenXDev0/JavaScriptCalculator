import { useState } from 'react';

function App() {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("xxxxx");
  const [isCalculated, setIsCalculated] = useState(false);

  const cleanInput = (input) => {
    return input.replace(/([+\-*/]){2,}/g, (match) => {
      return match.includes("-") && match.length === 2 ? match : match.slice(-1);
    });
  };

  const handleNumberClick = (value) => {
    if (isCalculated) {
      setInput(value);
      setIsCalculated(false);
    } else {
      setInput((prevInput) => (prevInput === "0" ? value : prevInput + value));
    }
  };

  const handleOperatorClick = (operator) => {
    setInput((prevInput) => {
      if (isCalculated) {
        setIsCalculated(false);
        return output + operator;
      }
      return cleanInput(prevInput + operator);
    });
  };

  const handleEqualsClick = () => {
    try {
      const sanitizedInput = cleanInput(input);
      const result = eval(sanitizedInput);
      const preciseResult = parseFloat(result.toFixed(4));
      setOutput(preciseResult);
      setInput(String(preciseResult));
      setIsCalculated(true);
    } catch (error) {
      setOutput("Error");
    }
  };

  const handleDecimalClick = () => {
    if (isCalculated) {
      setInput("0.");
      setIsCalculated(false);
    } else {
      setInput((prevInput) => {
        const parts = prevInput.split(/[^\d.]+/);
        if (!parts[parts.length - 1].includes(".")) {
          return prevInput + ".";
        }
        return prevInput;
      });
    }
  };

  const handleClearClick = () => {
    setInput("0");
    setOutput("xxxxx");
    setIsCalculated(false);
  };

  return (
    <div className="calculator">
      <div className="title">Calculator</div>
      <div className="display">
        <div id="display">{input}</div>
        <div id="result">{output}</div>
      </div>
      <div className="buttons">
        <button id="clear" onClick={handleClearClick}>C</button>
        <button id="divide" onClick={() => handleOperatorClick('/')}>/</button>
        <button id="multiply" onClick={() => handleOperatorClick('*')}>*</button>
        <button id="seven" onClick={() => handleNumberClick('7')}>7</button>
        <button id="eight" onClick={() => handleNumberClick('8')}>8</button>
        <button id="nine" onClick={() => handleNumberClick('9')}>9</button>
        <button id="subtract" onClick={() => handleOperatorClick('-')}>-</button>
        <button id="four" onClick={() => handleNumberClick('4')}>4</button>
        <button id="five" onClick={() => handleNumberClick('5')}>5</button>
        <button id="six" onClick={() => handleNumberClick('6')}>6</button>
        <button id="add" onClick={() => handleOperatorClick('+')}>+</button>
        <button id="one" onClick={() => handleNumberClick('1')}>1</button>
        <button id="two" onClick={() => handleNumberClick('2')}>2</button>
        <button id="three" onClick={() => handleNumberClick('3')}>3</button>
        <button id="equals" onClick={handleEqualsClick}>=</button>
        <button id="zero" onClick={() => handleNumberClick('0')}>0</button>
        <button id="decimal" onClick={handleDecimalClick}>.</button>
      </div>
    </div>
  );
}

export default App;
