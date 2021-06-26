"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHotelService = void 0;
const typedi_1 = require("typedi");
const hotel_persistence_adapter_1 = require("../../adapter/out/persistence/hotel/hotel-persistence.adapter");
let CreateHotelService = class CreateHotelService {
    constructor(hotelPersistenceAdapter) {
        this.createHotelPort = hotelPersistenceAdapter;
    }
    createNewHotel(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotel = command.getHotel;
            const hotelCreated = yield this.createHotelPort.createHotel(hotel);
            return hotelCreated;
        });
    }
};
CreateHotelService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [hotel_persistence_adapter_1.HotelPersistenceAdapter])
], CreateHotelService);
exports.CreateHotelService = CreateHotelService;
//# sourceMappingURL=create-hotel.service.js.map