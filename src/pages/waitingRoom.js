import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";

const socket = io("http://localhost:8080/chat");

const WaitingRoom = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const roomListHandler = (rooms) => {
      setRooms(rooms);
    };
    const createRoomHandler = (newRoom) => {
      setRooms((prevRooms) => [...prevRooms, newRoom]);
    };
    const deleteRoomHandler = (roomName) => {
      setRooms((prevRooms) => prevRooms.filter((room) => room !== roomName));
    };

    socket.emit("room-list", roomListHandler);
    socket.on("create-room", createRoomHandler);
    socket.on("delete-room", deleteRoomHandler);

    return () => {
      socket.off("room-list", roomListHandler);
      socket.off("create-room", createRoomHandler);
      socket.off("delete-room", deleteRoomHandler);
    };
  }, []);

  const onCreateRoom = () => {
    const roomName = prompt("방 이름을 입력해 주세요.");
    if (!roomName) return alert("방 이름은 반드시 입력해야 합니다.");

    socket.emit("create-room", roomName, (response) => {
      if (!response.success) return alert(response.payload);
      navigate(`/chat/${response.payload}`);
    });
  };

  const onJoinRoom = useCallback(
    (roomName) => () => {
      socket.emit("join-room", roomName, () => {
        navigate(`/chat/${roomName}`);
      });
    },
    [navigate]
  );

  return (
    <>
      <Head>
        <div>채팅방 목록</div>
        <button onClick={onCreateRoom}>채팅방 생성</button>
      </Head>

      <Table>
        <thead>
          <tr>
            <th>방번호</th>
            <th>방이름</th>
            <th>입장</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={room}>
              <td>{index + 1}</td>
              <td>{room}</td>
              <td>
                <button onClick={onJoinRoom(room)}>입장하기</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default WaitingRoom;

const Head = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 8px 12px;
  }
`;

const Table = styled.table`
  width: 100%;
  border: 1px solid #000;
  border-collapse: collapse;
  margin-top: 12px;

  thead {
    white-space: pre-wrap;
    th {
      padding: 8px 0;
    }
  }

  tbody {
    text-align: center;
  }

  th,
  td {
    border: 1px solid #000;
  }
`;
