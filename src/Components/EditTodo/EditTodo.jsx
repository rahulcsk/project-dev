import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { editTodo } from '../../Redux/todoslice';
import "./EditTodo.css"

const EditTodo = ({ todo }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: todo.title,
      description: todo.description,
      endDate: todo.endDate,
      isCompleted: todo.isCompleted,
      image: todo.image,
    },
  });

  const onSubmit = (data) => {
    const updatedTodo = {
      ...todo,
      ...data,
    };
    dispatch(editTodo({ oldTodo: todo, updatedTodo }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setValue('image', imageUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        type="text" 
        {...register('title')} 
        placeholder="Title" 
      />
      <textarea 
        {...register('description')} 
        placeholder="Description" 
      />
      <input 
        type="date" 
        {...register('endDate')} 
      />
      <input 
        type="checkbox" 
        {...register('isCompleted')} 
      />
      <input 
        type="file" 
        onChange={handleImageChange} 
      />
      <button type="submit">Update Todo</button>
    </form>
  );
};

export default EditTodo;