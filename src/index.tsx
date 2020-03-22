import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface ITodoItem {
  text: string;
  complete: boolean;
}

type FormEvent = React.FormEvent<HTMLFormElement>;
type InptuEvent = React.ChangeEvent<HTMLInputElement>

export const Home = (): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const [items, setItems] = useState<ITodoItem[]>([]);

  const handleSubmit = (evt: FormEvent): void => {
    evt.preventDefault();
    setItems([
      ...items,
      {
        text: value,
        complete: false,
      }
    ]);
    setValue('');
  };

  const handleChange = (evt: InptuEvent) => {
    const { value } = evt.target;
    setValue(value);
  };

  const completeTodo = (index: number) => {
    const newItems: ITodoItem[] = [...items];
    newItems[index].complete = !newItems[index].complete;
    
    setItems(newItems)
  };

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" required onChange={handleChange} value={value} />
        <button type="submit">Add todo</button>
      </form>
      <ul>
        {items.map(({ text, complete }: ITodoItem, index: number): JSX.Element => 
        <li key={text}>
          <span>{ text }</span>
          <button type="button" onClick={() => completeTodo(index)}>{ complete ? 'Undo': 'Complete'}</button>
          </li>
        )}
      </ul>
    </>
  )
}

const root = document.getElementById('root');

ReactDOM.render(<Home />, root);

export default Home;
