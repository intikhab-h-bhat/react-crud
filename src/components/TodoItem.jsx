
import React from 'react'

function TodoItem(props)
{

return(
    <li className='todo-item'>
        <div>
    {props.completed?<></>:<input type="checkbox"/>}
    <span>{props.text}</span>
    </div>
    <p>...</p>
    
    </li>

)

}
export default TodoItem