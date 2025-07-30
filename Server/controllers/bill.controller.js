const Bill = require("../model/Bill");

// post maintenance request
exports.billPostController = async (req, res, next) => {
    console.log(req.body);

    try {
        // let bill_req = new Bill({
        //     ...req.body,
        //     generatedBy: req.user._id,
        // });
        const { apartmentNumber, billNumber, totalAmount, month, year, electricityUnits, waterUsage, maintenanceFee, otherCharges, isPaid } = req.body;
        const generatedBills = await Bill.insertMany(
            apartmentNumber.map((apt) => ({
                apartmentNumber: apt,
                billType: "electricity",
                month,
                year,
                billNumber: billNumber,
                amount: totalAmount,
                breakdown: {
                    maintenanceFee,
                    electricityCharges: 0,
                    waterCharges: electricityUnits,
                    gasCharges: 0,
                    parkingCharges: 0,
                    otherCharges: {
                        description: "Cleaning Fee",
                        amount: 50,
                    },
                    lateFee: 0,
                    discount: 0,
                },
                dueDate: new Date(),
                generatedDate: new Date(),
                isPaid,
                paidAmount: 0,
                paymentMethod: null,
                paymentReference: null,
                generatedBy: req.user._id, // assume admin is logged in
                notes: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            }))
        );
        // const createdBills = await Bill.insertMany(generatedBills);
        return res.status(201).json({ message: "bill post created", data: generatedBills });
    } catch (err) {
        console.log(err);
    }
};
