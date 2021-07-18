export interface UpdateRoomCategoryPort {
    updateCategoryRoom(nameCategory:string, roomCategoryId:number):Promise<any>
}