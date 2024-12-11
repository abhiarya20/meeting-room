import UserDto from "../dtos/user-dto";
import hashService from "../services/hash-service";
import otpService from "../services/otp-service";
import tokenService from "../services/token-service";
import userService from "../services/user-service";

class AuthController {
  async sendOtp(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
        description: "Please enter your email address to receive the OTP.",
      });
    }

    const otp = await otpService.generateOtp();
    const ttl = 1000 * 60 * 5; // 2 min
    const expires = Date.now() + ttl;
    const data = `${email}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data);

    // send OTP
    try {
      await otpService.sendByEmail(email, otp);
      res.json({
        hash: `${hash}.${expires}`,
        email,
        message: "OTP Sent Successfully!",
        description: "We've sent an OTP to your email. Please check your inbox.",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to Send OTP.",
        description: "An error occurred while sending the OTP. Please try again later.",
      });
    }
  }

  async verifyOtp(req, res) {
    const { otp, hash, email } = req.body;
    if (!otp || !hash || !email) {
      return res.status(400).json({
        message: "Incomplete Information.",
        description: "All fields (OTP, hash, and email) are required for verification.",
      });
    }

    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > +expires) {
      return res.status(400).json({
        message: "OTP Has Expired.",
        description: "The OTP you entered is no longer valid. Please request a new one.",
      });
    }

    const data = `${email}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashedOtp, data);
    if (!isValid) {
      return res.status(400).json({
        message: "Invalid OTP.",
        description: "The OTP you entered is incorrect. Please check and try again.",
      });
    }

    let user;
    try {
      user = await userService.findUser({ email });
      if (!user) {
        user = await userService.createUser({ email });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "User Processing Error.",
        description: "There was an error processing your user information. Please try again.",
      });
    }

    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    try {
      await tokenService.storeRefreshToken(refreshToken, user._id);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error Storing Token.",
        description: "An error occurred while storing your refresh token. Please try again.",
      });
    }

    res.cookie("refreshToken", refreshToken, {
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year in milliseconds
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    res.json({
      user: userDto,
      auth: true,
      message: "Authentication Successful!",
      description: "You have successfully verified your OTP and are now logged in.",
    });
  }

  async refresh(req, res) {
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    let userData;
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      return res.status(401).json({
        message: "Session Expired.",
        description: "Your session has expired. Please log in again.",
      });
    }     

    console.log(userData);
    

    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );
      if (!token) {
        return res.status(401).json({
          message: "Invalid Refresh Token.",
          description: "Your refresh token is invalid. Please log in again.",
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error.",
        description: "An error occurred while validating your token. Please try again.",
      });
    }

    const user = await userService.findUser({ _id: userData._id });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found.",
        description: "No user was found associated with this token.",
      });
    }

    const { refreshToken, accessToken } = tokenService.generateTokens({
      _id: userData._id,
    });

    try {
      await tokenService.updateRefreshToken(
        userData._id,
        refreshTokenFromCookie,
        refreshToken
      );
    } catch (err) {
      return res.status(500).json({
        message: "Error Updating Token.",
        description: "An error occurred while updating your refresh token. Please try again.",
      });
    }

    res.cookie("refreshToken", refreshToken, {
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year in milliseconds
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    res.status(200).json({
      user: userDto,
      auth: true,
      message: "Tokens Successfully Refreshed!",
      description: "Your session has been refreshed successfully.",
    });
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;
    try {
      await tokenService.removeToken(req.id, refreshToken);
    } catch (err) {
      console.log(err);
    }
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({
      user: null,
      auth: false,
      message: "Logged Out Successfully!",
      description: "You have been logged out of your account.",
    });
  }
}

export default new AuthController();
