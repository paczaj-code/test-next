import React from 'react';
// import NotFound from '../not-found';
import { notFound } from 'next/navigation';

interface PageParams {
  params: {
    todoId: number;
  };
}

interface TodoTypes {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const dynamicParams = true;

const fetchTodo = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    next: { revalidate: 60 },
  });
  const todo: TodoTypes = await res.json();
  return todo;
};

const Todo = async ({ params: { todoId } }: PageParams) => {
  const todo = await fetchTodo(todoId.toString());

  if (!todo.id) return notFound();

  return (
    <div>
      <p>{todo.id}</p>
      <p>{todo.userId}</p>
      <p>{todo.title}</p>
    </div>
  );
};

export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
  const todos: TodoTypes[] = await res.json();

  const trimmedTodos = todos.splice(0, 10);
  return trimmedTodos.map((todo) => ({
    todoId: todo.id.toString(),
  }));
}

export default Todo;
