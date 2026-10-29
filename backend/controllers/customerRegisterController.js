
import Customer from "../models/customer.js";
import bcrypt from "bcrypt";

const customerRegisterController = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;
//check if the email is already registered
        const existingCustomer = await Customer.findOne({ email: email });

        if (existingCustomer) {
            return res.status(400).json({
                message: "Email is already registered"
            });
        }
//Encrypts the password into a hash
        const hashedPassword = await bcrypt.hash(password, 10);

        const newCustomer = new Customer({
            fullName: fullName,
            email: email,
            phone: phone,
            password: hashedPassword
        });

        await newCustomer.save();

        res.status(201).json({
            message: "Customer registered successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error registering customer"
        });
    }
};

export default customerRegisterController;
