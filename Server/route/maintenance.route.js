const router = require("express").Router();
const { maintenancePostController } = require("../controllers/maintenanceController"); // ### Maintenance CRUD
// ```
// GET    /api/maintenance             # Get maintenance requests (filtered by user role)
// GET    /api/maintenance/:id         # Get maintenance request by ID
// POST   /api/maintenance             # Create new maintenance request
// PUT    /api/maintenance/:id         # Update maintenance request
// DELETE /api/maintenance/:id         # Delete maintenance request
// ```;

router.post("/", maintenancePostController);

module.exports = router;
