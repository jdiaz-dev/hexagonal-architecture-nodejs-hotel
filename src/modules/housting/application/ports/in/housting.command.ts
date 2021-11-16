export class HoustingCommand {
    constructor(
        private cashId:number,
        private clientId:number,
        private roomId:number
    ){}
    get getCashId(){
        return this.cashId
    }
    get getClientId(){
        return this.clientId
    }
    get getRoomId(){
        return this.roomId
    }

}