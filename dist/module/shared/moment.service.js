"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MomentService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
let MomentService = class MomentService {
    validateISOdate(departureTime) {
        return moment(departureTime, moment.ISO_8601, true).isValid();
    }
    adjustArrivalTime(departureTime, durationEstimated) {
        return moment(departureTime).add(durationEstimated, 'hours').toISOString();
    }
    static getMomentPTBR() {
        return moment(new Date()).add(-3, 'hours').toISOString();
    }
};
MomentService = __decorate([
    (0, common_1.Injectable)()
], MomentService);
exports.MomentService = MomentService;
//# sourceMappingURL=moment.service.js.map