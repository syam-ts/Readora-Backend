"use strict";
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
exports.EditProfile = void 0;
const errorUserProfile_1 = require("../../../utils/ErrorHandling/errorUserProfile");
class EditProfile {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(user) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, errorUserProfile_1.profileError)(user);
            return yield this.userRepository.editProfile(user);
        });
    }
}
exports.EditProfile = EditProfile;
