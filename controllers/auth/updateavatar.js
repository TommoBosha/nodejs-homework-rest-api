const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const { UserModel } = require("../../database/user.model");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");



const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);


    Jimp.read(tempUpload, async (err, ava) => {
        if (err) throw err;
        await ava.resize(250, 250).writeAsync(tempUpload);
        await fs.rename(tempUpload, resultUpload);
    });

    const avatarURL = path.join("avatars", filename);
    await UserModel.findByIdAndUpdate(_id, { avatarURL });
    res.json({
        avatarURL,
    });
};

module.exports = {
    updateAvatar

};