export class ProductDomain {
  constructor(private hotelId: number) {}
  checkIfProductBelongsToHotel(hotelId: number) {
    if (this.hotelId !== hotelId) return false;
    return true;
  }
}
