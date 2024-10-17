import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addCase } from "../../Redux/todoslice";
import { TextField, Button, Typography, Box } from "@mui/material";

const Todo = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = (data) => {
    const newTodo = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      endDate: data.endDate,
      isCompleted: false,
      image: URL.createObjectURL(data.image[0]),
    };
    dispatch(addCase(newTodo));
    reset();
    setImagePreview(null); 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Box
      className="todo-form-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: 2,
        boxShadow: 3,
        marginTop: 4,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Add a New Todo
      </Typography>
      <form className="todo-form" onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          variant="outlined"
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          {...register("description", { required: "Description is required" })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <TextField
          fullWidth
          margin="normal"
          type="date"
          variant="outlined"
          {...register("endDate", { required: "End Date is required" })}
          InputLabelProps={{ shrink: true }}
          error={!!errors.endDate}
          helperText={errors.endDate?.message}
        />
        <input
          type="file"
          {...register("image", { required: "Image is required" })}
          onChange={handleImageChange}
          style={{ margin: '16px 0' }}
        />
        {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}
        {imagePreview && (
          <Box sx={{ marginBottom: 2 }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Add Todo
        </Button>
      </form>
    </Box>
  );
};

export default Todo;
