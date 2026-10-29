
require("./connection");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/admin");

async function createAdmin() {
    try {
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!email || !password) {
            throw new Error(
                "Please provide ADMIN_EMAIL and ADMIN_PASSWORD."
            );
        }

        if (
            password.length < 8 ||
            password.length > 20 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/[0-9]/.test(password) ||
            !/[^A-Za-z0-9]/.test(password)
        ) {
            throw new Error(
                "Password must be 8-20 characters and contain uppercase, lowercase, number, and special character."
            );
        }

        const normalizedEmail = email.trim().toLowerCase();

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingAdmin = await Admin.findOne({
            email: normalizedEmail
        });

        if (existingAdmin) {
            existingAdmin.password = hashedPassword;
            await existingAdmin.save();

            console.log("Admin password updated successfully!");
        } else {
            await Admin.create({
                email: normalizedEmail,
                password: hashedPassword
            });

            console.log("Admin account created successfully!");
        }
    } catch (error) {
        console.error("Admin setup error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();
