import { useEffect, useRef } from 'react'; 

const GuestVideo = ( { stream, style, expanded } ) => {

    const guestVideoRef = useRef();

    useEffect(()=>{

        if('srcObject' in guestVideoRef.current){
            guestVideoRef.current.srcObject = stream;
        }else{
            guestVideoRef.current.src = window.URL.createObjectURL(stream)
        }

    }, [stream])


    return (
        <video playsInline ref={guestVideoRef} autoPlay style={expanded ? style.media : style.guestMedia}></video>
    )
}

export default GuestVideo;