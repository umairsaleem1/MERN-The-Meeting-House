import React, { useEffect } from 'react'

const Rooms = () => {

  useEffect(()=>{
    const fetchRooms = async ()=>{
      try{
        const res = await fetch('/rooms');
        if(!res.ok){
          throw new Error(res.statusText);
        }

        const data = await res.json();

        console.log(data);
      }catch(e){
        console.log(e);
      }
    }
    fetchRooms();
    
  }, [])

  return (
  <h1>Rooms</h1>
    )
}

export default Rooms;