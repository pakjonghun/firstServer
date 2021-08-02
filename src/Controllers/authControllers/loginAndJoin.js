import jwt from "jsonwebtoken";
import SHA256 from "crypto-js/sha256";
import User from "../../model/User";
import uuid from "uuid";
// import SECRET_KEY from "../../config/secretKey";

export const login = async (req, res) => {
  try {
    const { id, password } = req.body;

    const encryptedPassword = SHA256(password).toString();

    const user = await User.findOne({ id, password: encryptedPassword });

    if (!user) {
      res.json({
        ok: false,
        errorMessage: "아이디 또는 비밀번호를 다시 확인해주세요.",
      });
      return;
    }

    const token = jwt.sign(
      { nickname: user.nickname },
      process.env.SECRET_KEY || SECRET_KEY
    );

    res.send({ ok: true, token });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다 관리자에게 문의하세요.",
    });
  }
};

export const join = async (req, res) => {
  try {
    const { phoneNumber, id, password, nickname } = req.body;
    const encryptedPassword = SHA256(password).toString();

    await User.create({
      socialId: uuid.v4(),
      phoneNumber,
      id,
      password: encryptedPassword,
      nickname,
    });

    res.json({ ok: true });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다 관리자에게 문의하세요.",
    });
  }
};
