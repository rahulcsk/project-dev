import {createSlice} from '@reduxjs/toolkit';

const initialState={
    todoData:[]
}

const TodoSlice= createSlice({
    name:'TodoApp',
    initialState,
    reducers:{
        addCase:(state,action)=>{
              state.todoData.push(action.payload)
        },
        editTodo: (state, action) => {
            const { id, updatedTodo } = action.payload;
            const index = state.todoData.findIndex(todo => todo.id === id);
            if (index !== -1) {
              state.todoData[index] = updatedTodo;
            }
          },
          deleteTodo: (state, action) => {
            state.todoData = state.todoData.filter(todo => todo.id !== action.payload);
          },
    }
})

export const {addCase,editTodo,deleteTodo}=TodoSlice.actions
export default TodoSlice.reducer;