import RefreshModel from "../models/refresh-model";
import jwt from "jsonwebtoken";
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1y",
    });
    return { accessToken, refreshToken };
  }

  async storeRefreshToken(refreshToken, userId) {
    await RefreshModel.findOneAndUpdate(
      { userId },
      { $push: { token: refreshToken } },
      { upsert: true, new: true }
    );
  }

  async verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, accessTokenSecret);
  }

  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, refreshTokenSecret);
  }

  async findRefreshToken(userId, refreshToken) {
    return await RefreshModel.findOne({
      userId,
      token: { $in: [refreshToken] },
    });
  }

  async updateRefreshToken(userId, oldRefreshToken, refreshToken) {
    await this.removeToken(userId, oldRefreshToken);
    await RefreshModel.findOneAndUpdate(
      { userId },
      { $push: { token: refreshToken } },
      { upsert: true, new: true }
    );
  }

  async removeToken(userId, refreshToken) {
    return await RefreshModel.findOneAndUpdate(
      { userId, token: { $in: [refreshToken] } },
      { $pull: { token: refreshToken } }
    );
  }
}

export default new TokenService();
