import { randomInt } from "crypto"

export const generateOtp = (): number => {
    return randomInt(1000, 10000)
};

