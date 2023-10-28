import React,{useState,useRef} from 'react'
import { Modal } from './Modal';

const NewTask = ({onadd}) => {
    const [enteredTask,setEnteredTask]=useState('');
    const errormodal=useRef();
    const clickHandler=()=>{
        if(enteredTask.trim()===''){
            // showmodal
            errormodal.current.open();
            return ;
        }
        onadd(enteredTask);
        setEnteredTask('');
    }
    const changeHandler=(event)=>{
        setEnteredTask(event.target.value);
        
    }
  return (
    <>
    <Modal ref={errormodal} buttoncaption="okay">
    <p className="text-stone-600 mb-4">oops!!! ..... looks like you forgot to enter a value</p>
    </Modal>
    <div className="flex items-center gap-4">
        <input value={enteredTask} onChange={changeHandler} type='text'  className="w-64 px-2 py-1 rounded-sm bg-stone-200"/>
        <button onClick={clickHandler} className="text-stone-700 hover:text-stone-950">Add Task</button>
    </div>
    </>
  )
}

export default NewTask