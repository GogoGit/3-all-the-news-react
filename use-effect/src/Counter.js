import React from "react";
import {
  ChevronUp,
  ChevronsUp,
  ChevronDown,
  ChevronsDown,
  RotateCcw,
  Hash,
} from "react-feather";

function Counter({ name, initialVal = 0 }) {
  const [count, setCount] = React.useState(initialVal);

  React.useEffect(() => {
    document.title = `(${count}) — Counter 2.0`;
  }, [count]);

  console.log("Document title is:", document.title);

  return (
    <>
      <h2>Hi {name}!</h2>
      <div className="wrapper">
        <p>
          <span>Current value:</span>
          <span className="count">{count}</span>
        </p>
        <div className="button-row">
          <button onClick={() => setCount(count + 1)}>
            <ChevronUp />
          </button>
          <button onClick={() => setCount(count + 10)}>
            <ChevronsUp />
          </button>
          <button onClick={() => setCount(initialVal)}>
            <RotateCcw />
          </button>
          <button
            onClick={() => {
              const nextCount = Math.ceil(Math.random() * 100);
              setCount(nextCount);
            }}
          >
            <Hash />
          </button>
          <button onClick={() => setCount(count - 10)}>
            <ChevronsDown />
          </button>
          <button onClick={() => setCount(count - 1)}>
            <ChevronDown />
          </button>
        </div>
      </div>
    </>
  );
}

export default Counter;
