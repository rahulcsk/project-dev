import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { editTodo, deleteTodo } from "../../Redux/todoslice";
import './TodoShow.css'; 

const TodoShow = () => {
  const { todoData } = useSelector((state) => state.Todo);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  const handleEditClick = (todo) => {
    setIsEditing(todo.id);
    setValue("title", todo.title);
    setValue("description", todo.description);
    setValue("endDate", todo.endDate);
    setValue("isCompleted", todo.isCompleted);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteTodo(id));
  };

  const onSubmit = (data) => {
    const updatedTodo = {
      ...data,
      id: isEditing,
      image: data.image.length > 0 ? URL.createObjectURL(data.image[0]) : todoData.find(todo => todo.id === isEditing).image,
    };
    dispatch(editTodo({ id: isEditing, updatedTodo }));
    setIsEditing(null);
  };

  return (
    <>
      <table className="todo-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>End Date</th>
            <th>Image</th>
            <th>IsCompleted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todoData.map((item) => (
            <tr key={item.id}>
              {isEditing === item.id ? (
                <td colSpan="6">
                  <form className="todo-form" onSubmit={handleSubmit(onSubmit)}>
                    <input
                      type="text"
                      {...register("title", { required: 'Title is required' })}
                      placeholder="Title"
                    />

                    <textarea
                      {...register("description", { required: 'Description is required' })}
                      placeholder="Description"
                    />

                    <input
                      type="date"
                      {...register("endDate", { required: 'End date is required' })}
                    />

                    <input type="checkbox" {...register("isCompleted")} />

                    <input type="file" {...register("image")} />

                    <button type="submit">Save</button>
                  </form>
                </td>
              ) : (
                <>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.endDate}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>{item.isCompleted ? "Completed" : "inComplete"}</td>
                  <td>
                    <button onClick={() => handleEditClick(item)}>Edit</button>
                    <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TodoShow;
