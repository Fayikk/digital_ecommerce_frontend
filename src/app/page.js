'use client';
import { useSelector,useDispatch } from "react-redux";


export default function Home() {
  const counter = useSelector((state) => state.counter.value); 
  const dispatch = useDispatch();




  return (
    <div >
    </div>
  );
}
