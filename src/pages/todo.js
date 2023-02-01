import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { deleteTodo, getTodoList, updateLike } from "../api/todo";
import Form from "../components/Form/Form";

const url = "/boards";

function Todo() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["getTodo", url], () =>
    getTodoList(url)
  );

  const deleteQuery = useMutation((id) => deleteTodo(url, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getTodo"]);
    },
  });

  const likeQuery = useMutation((id) => updateLike(url, id), {
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(["getTodo"]);
      }, 200);
    },
  });

  if (isLoading) return <div>...Loading</div>;
  return (
    <TodoWrap>
      <h2>todo</h2>
      <ul>
        {data?.map((todo) => {
          return (
            <li key={todo.id} style={{ padding: "20px 0" }}>
              <h4> title: {todo.title}</h4>
              <h4> desc: {todo.description}</h4>
              <h4> status: {todo.status}</h4>
              <h4> completed: {todo.completed}</h4>
              <h4>
                {" "}
                createdAt: {dayjs(todo.createdAt).format("YYMMDD HH:MM")}
              </h4>
              <div>
                <p>likeCnt: {todo.likeCnt}</p>
                <button onClick={() => likeQuery.mutate(todo.id)}>
                  {todo.likeCnt % 2 !== 0 ? "좋아요 취소" : "좋아요 누르기"}
                </button>
              </div>
              <button onClick={() => deleteQuery.mutate(todo.id)}> X</button>
            </li>
          );
        })}
      </ul>
      <Form />
    </TodoWrap>
  );
}

export default Todo;

const TodoWrap = styled.div`
  width: 800px;
  margin: 100px auto;
  padding: 30px;
  overflow: auto;
  display: flex;
  justify-content: space-between;
  h2 {
    font-size: 30px;
    font-weight: 600;
  }
`;
