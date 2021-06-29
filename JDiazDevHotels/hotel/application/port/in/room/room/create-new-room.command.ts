import { RoomEntity } from '../../../../../domain/room';

export class CreateNewRoomCommand {
    constructor(
        private roomEntity:RoomEntity,
    ){}
    get getRoomEntity():RoomEntity{
        return this.roomEntity
    }

}