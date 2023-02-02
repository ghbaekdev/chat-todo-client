import classNames from "classnames";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { SocketContext } from "../components/socketContext/socketContext";

// 훅분리 및 방에 접속해서 join

const Chat = () => {
  const socket = useContext(SocketContext);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const chatContainerEl = useRef(null);
  const { roomName } = useParams();
  const navigate = useNavigate();

  // 채팅이 길어지면(chats.length) 스크롤이 생성되므로, 스크롤의 위치를 최근 메시지에 위치시키기 위함
  useEffect(() => {
    if (!chatContainerEl.current) return;

    const chatContainer = chatContainerEl.current;
    const { scrollHeight, clientHeight } = chatContainer;

    if (scrollHeight > clientHeight) {
      chatContainer.scrollTop = scrollHeight - clientHeight;
    }
  }, [chats.length]);

  // message event listener
  useEffect(() => {
    const messageHandler = (chat) => {
      console.log(chat);
      setChats((prevChats) => [...prevChats, chat]);
    };

    socket.on("message", messageHandler);
    return () => {
      socket.off("message", messageHandler);
    };
  }, []);

  const onChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const onSendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (!message) return alert("메시지를 입력해 주세요.");

      socket.emit("message", { roomName, message }, (chat) => {
        setChats((prevChats) => [...prevChats, chat]);
        setMessage("");
      });
    },
    [message, roomName]
  );

  const onLeaveRoom = useCallback(() => {
    socket.emit("leave-room", roomName, () => {
      navigate("/chat");
    });
  }, [navigate, roomName]);

  return (
    <>
      <h1>{roomName}방</h1>
      <LeaveButton onClick={onLeaveRoom}>방 나가기</LeaveButton>
      <ChatContainer ref={chatContainerEl}>
        {chats.map((chat, index) => (
          <MessageBox
            key={index}
            className={classNames({
              my_message: socket.id === chat.username,
              alarm: !chat.username,
            })}
          >
            <span>
              {chat.username
                ? socket.id === chat.username
                  ? ""
                  : chat.username
                : ""}
            </span>
            <Message className="message">{chat.message}</Message>
          </MessageBox>
        ))}
      </ChatContainer>
      <MessageForm onSubmit={onSendMessage}>
        <input type="text" onChange={onChange} value={message} />
        <button>보내기</button>
      </MessageForm>
    </>
  );
};

export default Chat;

const LeaveButton = styled.button`
  margin-bottom: 0.5rem;
  display: block;
  margin-left: auto;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  padding: 1rem;

  min-height: 360px;
  max-height: 600px;
  overflow: auto;

  background: #b2c7d9;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;

  &.my_message {
    align-self: flex-end;

    .message {
      background: yellow;
      align-self: flex-end;
    }
  }

  &.alarm {
    align-self: center;
  }
`;

const Message = styled.span`
  margin-bottom: 0.5rem;
  background: #fff;
  width: fit-content;
  padding: 12px;
  border-radius: 0.5rem;
`;

const MessageForm = styled.form`
  display: flex;
  margin-top: 24px;

  input {
    flex-grow: 1;
    margin-right: 1rem;
  }
`;
