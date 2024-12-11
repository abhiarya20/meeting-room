import React from "react";
import styles from "./room-card.module.css";
import { useNavigate } from "react-router-dom";
import { FaVideo } from "react-icons/fa";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/${room.id}`);
      }}
      className={styles.card}
    >
      <div className={styles.meetingType}>
        <div className={styles.sides}>
          <span>
            <FaVideo />
          </span>
          <span>Meeting</span>
        </div>
        <div className={`${styles.sides} ${styles.meetingStatus}`}>
          <span>
            <FaVideo />
          </span>
          <span>Meeting</span>
        </div>
      </div>
      <h3 className={styles.topic}>{room.topic}</h3>
      <div className={styles.container}>
        <div className={styles.userInfo}>
          <img
            src={room?.owner?.avatar}
            alt="post profile"
            className={styles.avatar}
          />
          <div className="flex flex-col">
            <h4 className={`${styles.userName} ${styles.userName.md}`}>
              {room?.owner?.name}
            </h4>
            <div className={styles.status}>
              <span className={`${styles.statusText} ${styles.statusText.md}`}>
                Host
              </span>
            </div>
          </div>
        </div>
        {/* <span className={`${styles.date} ${styles.date.md}`}>
                    {new Date(room.createdAt).getDate()}{" "}
                    {new Date(room.createdAt).toLocaleString("default", {
                        month: "long",
                    })}
                </span> */}

        {/* <div
                className={`${styles.speakers} ${
                    room.speakers.length === 1 ? styles.singleSpeaker : ''
                }`}
            >
                 <div className={styles.avatars}>
                    {[room.owner,room.owner,room.owner].map((speaker) => (
                        <img
                            key={speaker.id}
                            src={speaker.avatar}
                            alt="speaker-avatar"
                        />
                    ))}
                </div>
                <div className={styles.names}>
                    {room.speakers.map((speaker) => (
                        <div key={speaker.id} className={styles.nameWrapper}>
                            <span>{speaker.name}</span>
                            <img
                                src="/images/chat-bubble.png"
                                alt="chat-bubble"
                            />
                        </div>
                    ))}
                </div>
            </div> */}
      </div>

      {/* <div
                className={`${styles.speakers} ${
                    room.speakers.length === 1 ? styles.singleSpeaker : ''
                }`}
            >
                 <div className={styles.avatars}>
                    {[room.owner,room.owner,room.owner].map((speaker) => (
                        <img
                            key={speaker.id}
                            src={speaker.avatar}
                            alt="speaker-avatar"
                        />
                    ))}
                </div>
                <div className={styles.names}>
                    {room.speakers.map((speaker) => (
                        <div key={speaker.id} className={styles.nameWrapper}>
                            <span>{speaker.name}</span>
                            <img
                                src="/images/chat-bubble.png"
                                alt="chat-bubble"
                            />
                        </div>
                    ))}
                </div>
            </div> */}
      {/* <div className={styles.peopleCount}>
                    <span>{room.totalPeople}</span>
                    <img src="/images/user-icon.png" alt="user-icon" />
                </div> */}
    </div>
  );
};

export default RoomCard;
