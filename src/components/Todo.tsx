import { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import { AppDispatch } from '../redux/store';
import { deleteTodo, editTodo, isComplete } from '../redux/todosSlice';

interface TodoListItemProps {
  todo: Todo['todo'];
  id: Todo['id'];
}

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      width: 360,
    },
  },
  deleteIcon: {
    color: 'blue',
    '&:hover': {
      color: 'red',
    },
  },
  editTodo: {
    background: 'blue',
  },
}));

const Todo = ({ todo, id }: TodoListItemProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const editText = useRef('');
  const classes = useStyles();

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: any) => {
    editText.current = e.target.value;
    dispatch(
      editTodo({
        id,
        todo: e.target.value,
        isComplete: false,
      }),
    );
  };

  const handleCheckbox = (e: any) => {
    setIsChecked(e.target.checked);
    dispatch(isComplete({ id, todo, isComplete: !isChecked }));
  };

  return (
    <li
      className={classes.listItem}
      style={isChecked ? { textDecoration: 'line-through', opacity: '0.7' } : undefined}
    >
      <Checkbox
        checked={isChecked}
        onChange={handleCheckbox}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <ContentEditable
        html={todo}
        onBlur={() => console.log(editText.current)}
        onChange={handleChange}
      />
      <DeleteIcon
        className={classes.deleteIcon}
        onClick={() => dispatch(deleteTodo(id))}
      />
    </li>
  );
};

export default Todo;
