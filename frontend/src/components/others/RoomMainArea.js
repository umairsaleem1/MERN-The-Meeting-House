import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import RoomHostScreen from "./RoomHostScreen";
import RoomGuestsScreen from "./RoomGuestsScreen";
import 'swiper/css';
import 'swiper/css/pagination';






const style = {
    container: {
        width: '100%',
        height: 'calc(100vh - 160px)'
    },
    swiper: {
        width: '100%',
        height: '100%'
    }
}
const RoomMainArea = () => {
    return (
        <Box sx={style.container}>
            <Swiper
                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSlideChange={() => console.log('slide change')}
                style={style.swiper}
            >
                <SwiperSlide>
                    <RoomHostScreen/>
                </SwiperSlide>
                <SwiperSlide>
                    <RoomGuestsScreen/>
                </SwiperSlide>
            </Swiper>
        </Box>
    )
}

export default RoomMainArea;