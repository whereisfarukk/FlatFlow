const MaintenanceRequest = require("../model/MaintenanceRequest");

// post maintenance request
exports.maintenancePostController = async (req, res, next) => {
    console.log(req.user);

    try {
        let maintenance_req = new MaintenanceRequest({ ...req.body, submittedBy: req.user._id, apartmentNumber: req.user.apartmentNumber });
        let create_maintenance_req = await maintenance_req.save();
        return res.status(201).json({ message: "maintenance post created", maintanance_post: create_maintenance_req });
    } catch (err) {
        console.log(err);
    }
};
