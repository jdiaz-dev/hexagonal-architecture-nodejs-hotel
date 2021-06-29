import { RoomData } from "./room-data"

export class RoomEntity {
    constructor(
        private roomData:RoomData,
        private hotelId:number
    ){}
    checkIfRoomLevelBelognsToHotel(hotelId:number):boolean{
        if(hotelId !== this.hotelId) return false
        return true
    }
    checkIfRoomCategoryBelongsToHotel(hotelId:number):boolean{
        if(hotelId !== this.hotelId) return false
        return true
    }
    checkIfExistsRoomCondition(condition:any){
        if(!condition) return false
        return true
    }
    get getRoomData():RoomData{
        return this.roomData
    }
    get getHoteId():number{
        return this.hotelId
    }
    /* static createRoomEntity(roomData:RoomData, hotelId:number){
        return new RoomEntity(roomData, hotelId)
    } */

    

}