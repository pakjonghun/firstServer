import User from "../../model/User";
import jwt from "jsonwebtoken";
// import { Key } from "../../config/secretKey";

export const oAuth = async (req, res) => {
  const { socialId } = req.body;

  if (!socialId) {
    // socialId는 필수
    return res.status(400).json({ error: "socialId를 보내주세요." });
  }

  const user = await User.findOne({ socialId });

  if (!user) {
    return res.json({ action: "join" });
  }

  const token = jwt.sign(
    { nickname: user.nickname },
    process.env.SECRET_KEY || Key
  );

  res.json({ action: "login", token });
};

export const oAuthJoin = async (req, res) => {
  const { socialId, email, phoneNumber, nickname } = req.body;

  if (!socialId || !nickname) {
    //socialId랑 nickname은 필수
    return res
      .status(400)
      .json({ ok: false, error: "필수 정보를 모두 보내주세요." });
  }

  const user = await User.findOne({ nickname });

  if (user) {
    return res
      .status(400)
      .json({ ok: false, error: "이미 존재하는 닉네임입니다." });
  }

  try {
    await User.create({
      socialId,
      id: email,
      phoneNumber,
      nickname,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: "소셜 계정을 생성하는데 실패했습니다." });
  }

  const token = jwt.sign({ nickname: nickname }, process.env.SECRET_KEY || Key);

  res.json({ ok: true, token });
};
