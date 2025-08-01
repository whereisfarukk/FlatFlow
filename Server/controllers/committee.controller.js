const Meeting = require("../model/Meeting");

exports.meetingSchedulePostController = async (req, res, next) => {
    try {
        let meetingSchedule = new Meeting({ ...req.body, agenda: req.body.description, createdBy: req.user._id });
        let meetingScheduleReq = await meetingSchedule.save();
        return res.status(201).json({ message: "meeting post created", maintanance_post: meetingScheduleReq });
    } catch (err) {
        console.log(err);
    }
};
