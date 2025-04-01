'use client';
import styles from "./page.module.css";
import { useSelector,useDispatch } from "react-redux";
import {increment,decrement,incrementBy,reset} from "../redux/slices/counterSlice"; 


export default function Home() {
  const counter = useSelector((state) => state.counter.value); 
  const dispatch = useDispatch();




  return (
    <div className={styles.page}>
      <h1>Counter :  {counter}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementBy(5))}>Increment by 5</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <h2>Redux Persist Example</h2>
    </div>
  );
}
