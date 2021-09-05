export interface GetHoustingRequest {
    getTheHoustingByRoom(houstingId: number): Promise<any>
}