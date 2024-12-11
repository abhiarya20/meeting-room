import crypto from "crypto";

class HashService {
  hashOtp(data) {
    return crypto
      .createHmac("sha256", process.env.HASH_SECRET)
      .update(data)
      .digest("hex");
  }
}

export default new HashService();
