import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatRooms: null,
};

const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {
    setChatRooms: (state, action) => {
      state.chatRooms = action.payload;
    },
  },
});

export const { setChatRooms } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
