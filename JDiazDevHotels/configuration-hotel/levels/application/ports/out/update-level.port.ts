export interface UpdateLevelPort {
    updateLevel(numberLevel: number, nameLevel: string, levelId: number): Promise<any>
}