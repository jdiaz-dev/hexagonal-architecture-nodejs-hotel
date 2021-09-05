export class RoomWithLevelEntity {
    constructor(
        private levelId:number
    ){}

    checkIfRoomBelongsToLevel(levelId:number){
        if(this.levelId !== levelId) return false
        return true
    }
} 


