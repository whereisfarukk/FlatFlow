const FinancialRecord = require("../model/FinancialRecord");
exports.financialRecordPostController = async (req, res, next) => {
    try {
        let financialReport = new FinancialRecord({
            ...req.body,
            submittedBy: req.user._id,
            type: "expense",
        });
        const savedFinance = await financialReport.save();

        return res.status(201).json({
            message: "Document uploaded successfully",
            data: savedFinance,
        });
    } catch (err) {
        console.log(err);
    }
};
