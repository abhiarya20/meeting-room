import RoomModel from "../models/room-model";
class RoomService {
  async create(payload) {
    const { topic, roomType, owner } = payload;
    const room = await RoomModel.create({
      topic,
      roomType,
      owner,
      participants: [owner],
    });
    return room;
  }

  async getAllRooms(types) {
    const rooms = await RoomModel.find({ roomType: { $in: types } })
      .populate("participants")
      .populate("owner")
      .exec();
    return rooms;
  }

  async getRoom(roomId) {
    const room = await RoomModel.findOne({ _id: roomId });
    return room;
  }
}
export default new RoomService();
