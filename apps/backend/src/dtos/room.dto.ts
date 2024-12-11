class RoomDto {
  id;
  topic;
  roomType;
  owner;
  participants;
  createdAt;

  constructor(room) {
    this.id = room._id;
    this.topic = room.topic;
    this.roomType = room.roomType;
    this.owner = room.owner;
    this.participants = room.participants;
    this.createdAt = room.createdAt;
  }
}
export default RoomDto;
