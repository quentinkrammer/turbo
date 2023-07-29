import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import tableReducer from "./tableSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    table: tableReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
