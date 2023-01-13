import axios from 'axios';


export const loginUser = (email, password) => async(dispath)=> {

    try {

        //dispatch login request
        dispath({
            type: "LoginRequest"
        });
        
        //make post api call using axios
        const {data} = await axios.post("http://localhost:4000/api/v1/login", {email, password}, {
            withCredentials:true,
            credentials: 'include',
            headers:{
                "Content-Type":"application/json"
            },
            
        });

        //dispatch if success
        //failure will be automatically handeled by catch block
        dispath({
            type: "LoginSuccess",
            payload: data.user,
        });

    } catch (error) {
        //dispatch failure
        dispath({
            type: "LoginFailure",
            payload: error,
        });
    }

}

export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadUserRequest",
      });
  
      const { data } = await axios.get("http://localhost:4000/api/v1/me", {
        withCredentials:true,
            credentials: 'include',
      });
  
      dispatch({
        type: "LoadUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "LoadUserFailure",
        payload: error.response.data.message,
      });
    }
  };