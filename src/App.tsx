import { useState } from "react";
import "./App.css";

type Todo = {
  id: number;
  title: string | undefined;
  body: string | undefined;
  isdone: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "제목1",
      body: "내용1",
      isdone: false,
    },
    {
      id: 2,
      title: "제목2",
      body: "내용2",
      isdone: true,
    },
  ]);

  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();

  const todoList = todos.filter((todo) => {
    return todo.isdone === false;
  });
  const doneList = todos.filter((todo) => {
    return todo.isdone === true;
  });

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const newTodo = {
      id: todos.length + 1,
      title: title,
      body: body,
      isdone: false,
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <header> My TODOLIST </header>
      <div className="input">
        <form>
          제목 :{" "}
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          ></input>
          내용 :{" "}
          <input
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          ></input>
          <button onClick={onSubmit}>추가하기</button>
        </form>
      </div>
      <div className="List">
        <div className="Working">
          <h2>Working</h2>
          <div className="cards">
            {todoList.map((todo) => {
              {
                return (
                  <div className="card">
                    <div>{todo.id}</div>
                    <div>{todo.title}</div>
                    <div>{todo.body}</div>
                    <div>{todo.isdone.toString()}</div>
                    <div className="button">
                      <button
                        onClick={() => {
                          const deletedtodos = todos.filter((item) => {
                            return item.id !== todo.id;
                          });
                          setTodos(deletedtodos);
                        }}
                      >
                        삭제하기
                      </button>
                      <button
                        onClick={() => {
                          const newTodo = todos.map((item) => {
                            if (item.id === todo.id) {
                              return {
                                id: item.id,
                                title: item.title,
                                body: item.body,
                                isdone: !item.isdone,
                              };
                            } else {
                              return item;
                            }
                          });
                          setTodos(newTodo);
                        }}
                      >
                        완료
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="Done">
          <h2>Done</h2>
          {doneList.map((todo) => {
            {
              return (
                <div className="card">
                  <div>{todo.id}</div>
                  <div>{todo.title}</div>
                  <div>{todo.body}</div>
                  <div>{todo.isdone.toString()}</div>
                  <div className="button">
                    <button
                      onClick={() => {
                        const deletedtodos = todos.filter((item) => {
                          return item.id !== todo.id;
                        });
                        setTodos(deletedtodos);
                      }}
                    >
                      삭제하기
                    </button>
                    <button
                      onClick={() => {
                        const newTodo = todos.map((item) => {
                          if (item.id === todo.id) {
                            return {
                              ...item,
                              isdone: !item.isdone,
                            };
                          } else {
                            return item;
                          }
                        });
                        setTodos(newTodo);
                      }}
                    >
                      취소
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
