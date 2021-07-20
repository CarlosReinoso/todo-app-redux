import {
 Button, TextField, Typography, makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { keyCodes } from '../util/index';
import { addTodo } from '../redux/todosSlice';
import { AppDispatch } from '../redux/store';

const useStyles = makeStyles((theme) => ({
  modalBackdrop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '100%', // or maxWidth: 360, no breakpoint needed
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '60%',
    margin: theme.spacing(2),
    background: 'white',
    border: '2px solid white',
    borderRadius: 5,
    padding: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      width: 360,
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
  },
}));

interface AddTodoProps {
  isModal: () => void;
}

const AddTodoModal: React.FC<AddTodoProps> = ({
  isModal,
}: // addTodo,
AddTodoProps) => {
  const classes = useStyles();

  const [newTodo, setNewTodo] = useState<string>('');
  const [inputError, setInputError] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newTodo.length === 0 || newTodo.trim() === '') {
      setInputError('Input is empty. Please enter a todo');
    } else {
      dispatch(addTodo(newTodo));
      setNewTodo('');
      isModal();
      setInputError('');
    }
  };
  const handleKeyDown = ({ target, keyCode }: any) => {
    if (
      keyCode !== keyCodes.enter
      || target.value.length < 2
      || target.value.trim() === ''
    ) {
      setInputError('Input is empty. Please enter a todo');
    } else {
      dispatch(addTodo(newTodo));
      setNewTodo('');
      isModal();
      setInputError('');
    }
  };

  return (
    <div
      aria-label="close modal"
      role="button"
      tabIndex={keyCodes.esc}
      onClick={isModal}
      className={classes.modalBackdrop}
    >
      <div
        role="button"
        tabIndex={keyCodes.esc}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={classes.modalContent}
      >
        <Typography variant="h3">Add Your Todo</Typography>
        <form className={classes.form}>
          <TextField
            onChange={(e) => setNewTodo(e.target.value)}
            type="text"
            name="todo"
            placeholder="What do you have todo?"
            value={newTodo}
            id="filled-basic"
            label="Add Todo"
            variant="outlined"
            helperText={inputError}
            error={!!inputError} // double bang converts string into boolean
          />
          <Button
            onClick={handleSubmit}
            onKeyDown={handleKeyDown}
            variant="outlined"
            size="large"
            color="primary"
            type="submit"
          >
            Add Todo
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
