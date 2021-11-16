export interface HotelBcontextNeedUserFromUserBcontext {
    getUser(id:number):Promise<any>
    checkIfIsAdmin(id:number):Promise<boolean>
}