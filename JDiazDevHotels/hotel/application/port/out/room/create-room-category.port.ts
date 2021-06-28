export interface CreateRoomCategoryPort {
    createRoomCategory(nameCategory:string, hotelId:number):Promise<any>
}