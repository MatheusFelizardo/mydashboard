import { ThunkAction, Action, createStore } from '@reduxjs/toolkit';
import { User } from '../helper/types';

export const ADD_USER: string = 'ADD_USER'
export const UPDATE_USER: string = 'UPDATE_USER'

const INITIAL_STATE: any = {
  data: []
}

function users(state = INITIAL_STATE, action: { type: string; data: [] | User[]; }) {
  switch (action.type) {
    case UPDATE_USER: 
      return { data: action.data}
    case ADD_USER: 
      return { ...state, data: action.data}
      default: 
      return state
  }
}


export const store = createStore(users)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
