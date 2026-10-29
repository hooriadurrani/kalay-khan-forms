import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";

const adminLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await Admin.findOne({
            email: email.trim().toLowerCase()
        });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.status(200).json({
            message: "Admin login successful"
        });

    } catch (error) {
        console.error("Admin Login Error:", error);

        res.status(500).json({
            message: "Server error during admin login"
        });
    }
};

export default adminLoginController;