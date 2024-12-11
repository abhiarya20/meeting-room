import React, { useEffect, useState } from "react";

import AddRoomModal from "../../components/add-room-modal/add-room-modal";
import Navbar from "../../components/shared/navbar/navbar";
import RoomCard from "../../components/room-card/room-card";
import { getAllRooms } from "../../http";
import styles from "./rooms.module.css";

const Rooms = () => {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRooms = async () => {
    setError(false);
    setIsLoading(true);
    try {
      const { data } = await getAllRooms();
      setRooms(data);
    } catch (e) {
      setError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  function openModal() {
    setShowModal(true);
  }

  return (
    <>
    <Navbar showLoginBtn={false} />
      <div className="container">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All Meetings</span>
            <div className={styles.searchBox}>
              <img src="/images/search-icon.png" alt="search" />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search"
              />
            </div>
          </div>
          <div className={styles.right}>
            <button onClick={openModal} className={styles.startRoomButton}>
              <img src="/images/add-room-icon.png" alt="add-room" />
              <span>Start a room</span>
            </button>
          </div>
        </div>
        <div className={styles.roomList}>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
      {showModal && <AddRoomModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Rooms;
