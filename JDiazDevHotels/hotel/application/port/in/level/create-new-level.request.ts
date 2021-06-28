export interface CreateNewLevelRequest {
    createNewLevel(nameLevel:string, hotelId:number, clientId:number):Promise<any>
}