import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  room:localStorage.getItem("savedRoom")?JSON.parse(localStorage.getItem("savedRoom")) : null,
  participants: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setRoom(state, action) {
      const { room, participants } = action.payload;
      state.room=room;
      state.participants = participants;
    },
    setParticipants(state, action) {
      state.participants = action.payload;
    },
  },
});

export const {setParticipant,setLoading,setRoom}=roomSlice.actions
export default roomSlice.reducer