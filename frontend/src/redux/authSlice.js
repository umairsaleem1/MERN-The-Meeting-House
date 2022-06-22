import { createSlice } from '@reduxjs/toolkit';



const authSlice  = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        setUser(state, action){
            state.user = action.payload;
        }
    }
});




export const { setUser } = authSlice.actions;
export default authSlice.reducer;




// Thunks

export function getUser(navigate){

    return async function getUserThunk(dispatch, getState){

        const { user } = getState().auth;
        if(!user){
            try{
                const res = await fetch('/auth/authenticate');
                if(res.status===404){
                    navigate('/login');
                    throw new Error(res.statusText);
                }
                if(res.status===401){
                    navigate('/login');
                    throw new Error(res.statusText);
                }
                else if(!res.ok){
                    throw new Error(res.statusText);
                }

                const data = await res.json();

                dispatch(setUser(data.user));

            }catch(e){
                console.log(e);
            }
        }
    }
}