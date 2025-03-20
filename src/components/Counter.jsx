

import React, {useEffect, useState,useeffect} from 'react'

export default function Counter(){

    const [count,setCount]=useState(0)
    
    useEffect(()=>{
        console.log("Mounting")

        return function(){
            console.log("unmounting")
        }

    },[]);

    useEffect(()=>{
        console.log("Updating")

        return function(){
            console.log("unmounting1")
        }
    },[count])


    return(

        <>
        <p>Count is {count}</p>
        <p>The Number Is {count%2==0?"Even":"Odd"}</p>
        <button onClick={()=> setCount(count+1)}>Click Me</button>
        </>

    )
}