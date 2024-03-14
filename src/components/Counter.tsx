
import {useSelector, useDispatch} from 'react-redux'
import type { RootState } from '../store/store'
import {increment, decrement, reset} from '../reducers/CounterReducer'
import "bootstrap/dist/css/bootstrap.css";

const Counter = () => {
  const count = useSelector((state:RootState) => state.counter.count)
  const dispatch = useDispatch()
  return (
    <div className='text-center mt-3'>
      <h1>Counter :{count}</h1>
      <p>
        <button className='btn btn-primary ms-2' onClick= {()=>dispatch(increment())}>Increment</button>
        <button className='btn btn-primary ms-2' onClick= {()=>dispatch(decrement())}>Decrement</button>
        <button  className='btn btn-primary ms-2'onClick= {()=>dispatch(reset())}>Reset</button>
      </p>
    </div>
  )
}

export default Counter;
