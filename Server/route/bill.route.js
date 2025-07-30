const router = require("express").Router();
const { billPostController, getAllBills } = require("../controllers/bill.controller");

// importing middlewares
const { isAuthenticated, isAdmin } = require("../middleware/auth.middleware");
// ```
// GET    /api/maintenance             # Get maintenance requests (filtered by user role)
// GET    /api/maintenance/:id         # Get maintenance request by ID
// POST   /api/maintenance             # Create new maintenance request
// PUT    /api/maintenance/:id         # Update maintenance request
// DELETE /api/maintenance/:id         # Delete maintenance request
// ```;

router.post("/", isAuthenticated, isAdmin, billPostController);
router.get("/", isAuthenticated, isAdmin, getAllBills);

module.exports = router;
