export interface GetHoustingByRoomPort {
  getHoustingByRoom(roomId: number): Promise<any>
}