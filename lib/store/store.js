import { configureStore } from "@reduxjs/toolkit";
import chatRoomReducer from "../features/ChatRoom/ChatRoomSlice";

export default configureStore({
  reducer: {
    chatRooms: chatRoomReducer,
  },
});
