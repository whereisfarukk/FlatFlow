const path = require("path");
const authRoute = require("./auth.route");
const maintenanceRoute = require("./maintenance.route");
const announcementRoute = require("./announcement.route");
const uploadPdfRoute = require("./document.route");
const billRoute = require("./bill.route");
const financesRoute = require("./finances.route");
const route = [
    {
        path: "/auth",
        handler: authRoute,
    },
    {
        path: "/api/maintenance",
        handler: maintenanceRoute,
    },
    {
        path: "/api/announcement",
        handler: announcementRoute,
    },
    {
        path: "/api/document",
        handler: uploadPdfRoute,
    },
    {
        path: "/api/bills",
        handler: billRoute,
    },
    {
        path: "/api/finances",
        handler: financesRoute,
    },
    // {
    //     path: "/",
    //     handler: (req, res) => {
    //         res.json({
    //             message: "working",
    //         });
    //     },
    // },
];

module.exports = (app) => {
    route.forEach((route) => {
        if (route.path === "/") {
            app.get(route.path, route.handler);
        } else {
            app.use(route.path, route.handler);
        }
    });
};
