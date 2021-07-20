import React from 'react';
import TodoListItem from './Todo';

interface TodoListProps {
  todos: Array<Todo>;
}

const TodoList: React.FC<TodoListProps> = ({ todos }: TodoListProps) => (
  <ul>
    {todos.length > 0
      ? todos.map((item) => (
        <TodoListItem
          todo={item.todo}
          id={item.id}
          key={item.id}
        />
      ))
      : null}
  </ul>
);

export default TodoList;
