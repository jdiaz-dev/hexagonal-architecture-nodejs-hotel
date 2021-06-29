export interface CreateNewRoomCategoryRequest {
    createNewRoomCategory(nameCategory:string, hotelId:number):Promise<any>
}