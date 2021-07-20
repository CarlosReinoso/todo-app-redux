import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [] as any;

const todoSlice = createSlice({
  name: 'todo', //  generated action types
  initialState,
  //  state handling happens below
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      prepare: (todo: string) => ({
        payload: {
          id: uuidv4(),
          todo,
          isComplete: false,
        } as Todo,
      }),
    },
    deleteTodo(state, action: PayloadAction<string>) {
      //  createReducer(). You need to ensure that you either mutate the state argument or return a new state, but not both.
      return state.filter((item: Todo) => item.id !== action.payload);
    },
    editTodo(state, { payload }: PayloadAction<Todo>) {
      state.map((item: Todo) => (item.id === payload.id ? (item.todo = payload.todo) : item));
    },
    isComplete(state, { payload }: PayloadAction<Todo>) {
      state.map((item: Todo) => (item.id === payload.id ? (item.isComplete = payload.isComplete) : state));
    },
  },
});

export const
{
  addTodo, deleteTodo, editTodo, isComplete,
} = todoSlice.actions;
export default todoSlice.reducer;
