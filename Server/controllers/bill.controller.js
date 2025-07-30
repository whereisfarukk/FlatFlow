const Bill = require("../model/Bill");

// post maintenance request
exports.billPostController = async (req, res, next) => {
    console.log(req.body);
    const monthMap = {
        January: "01",
        February: "02",
        March: "03",
        April: "04",
        May: "05",
        June: "06",
        July: "07",
        August: "08",
        September: "09",
        October: "10",
        November: "11",
        December: "12",
    };
    try {
        // let bill_req = new Bill({
        //     ...req.body,
        //     generatedBy: req.user._id,
        // });
        const { apartmentNumber, billNumber, totalAmount, month, year, electricityUnits, waterUsage, maintenanceFee, otherCharges, isPaid } = req.body;
        const monthNumber = monthMap[month];

        const generatedDate = new Date(`${year}-${monthNumber}-01T00:00:00Z`);

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
                generatedDate,
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
exports.getAllBills = async (req, res) => {
    try {
        const bills = await Bill.find({}).sort({ generatedDate: -1 });

        res.status(200).json({
            success: true,
            message: "Bills fetched successfully",
            data: bills,
        });
    } catch (err) {
        console.error("Error fetching bills:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch bills",
        });
    }
};
