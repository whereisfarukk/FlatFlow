const Announcement = require("../model/Announcement");

// post maintenance request
exports.announcementController = async (req, res, next) => {
    console.log(req.user);

    try {
        let announcement_req = new Announcement({ ...req.body, postedBy: req.user._id });
        let create_announcement_req = await announcement_req.save();
        return res.status(201).json({ message: "maintenance post created", announcement_post: create_announcement_req });
    } catch (err) {
        console.log(err);
    }
};
