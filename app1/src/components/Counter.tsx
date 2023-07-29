import { useState } from "react";
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
  selectCount,
  selectCountStatus,
} from "../redux/counterSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export function Counter() {
  const count = useAppSelector(selectCount);
  const status = useAppSelector(selectCountStatus);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <div>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button onClick={() => dispatch(incrementByAmount(incrementValue))}>
          Add Amount
        </button>
        <button
          onClick={() => {
            dispatch(incrementAsync(incrementValue)).catch((e) =>
              console.log(e),
            );
          }}
        >
          Add Async
        </button>
        <button onClick={() => dispatch(incrementIfOdd(incrementValue))}>
          Add If Odd
        </button>
        <h1>{status}</h1>
      </div>
    </div>
  );
}
