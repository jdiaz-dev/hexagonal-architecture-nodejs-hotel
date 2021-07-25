export interface CreateLevelPort {
    createLevel(numberLevel: number, nameLevel: string, hotelId: number): Promise<any>
}