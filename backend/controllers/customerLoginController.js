
import Customer from "../models/customer.js";
import bcrypt from "bcrypt";

const customerLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const customer = await Customer.findOne({ email: email });

        if (!customer) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            customer.password
        );

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        res.status(200).json({
            message: "Login successful"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Login failed due to a server error"
        });
    }
};

export default customerLoginController;
