import { useEffect, useRef } from 'react'; 

const GuestVideo = ( { stream, style } ) => {

    const guestVideoRef = useRef();

    useEffect(()=>{

        if('srcObject' in guestVideoRef.current){
            guestVideoRef.current.srcObject = stream;
        }else{
            guestVideoRef.current.src = window.URL.createObjectURL(stream)
        }

    }, [])


    return (
        <video playsInline ref={guestVideoRef} autoPlay style={style.guestMedia}></video>
    )
}

export default GuestVideo;