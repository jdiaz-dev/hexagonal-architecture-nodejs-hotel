export class RoomWithLevelCommand {
    constructor(
        private levelId:number
    ){}
    get getLevelId(){
        return this.levelId
    }
}