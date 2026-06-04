const Connection = require('../models/connection.model');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Controller to handle submission of the connection inquiry form.
 * * @route POST /api/connection
 * @access Public
 */
const submitConnection = asyncHandler(async (req, res) => {
    const { name, email, phone, interests, customInterest, message } = req.body;

    // 1. Manual Validations
    if (!name || name.trim().length < 2) {
        return res.status(400).json({ success: false, message: "Name is required and must be at least 2 characters." });
    }

    if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return res.status(400).json({ success: false, message: "A valid email is required." });
    }

    if (!phone || phone.trim().length < 10) {
        return res.status(400).json({ success: false, message: "Phone number is required and must be at least 10 digits." });
    }

    if (!interests || !Array.isArray(interests) || interests.length === 0) {
        return res.status(400).json({ success: false, message: "At least one interest must be selected." });
    }

    if (interests.includes("Other") && (!customInterest || customInterest.trim() === "")) {
        return res.status(400).json({ success: false, message: "Please specify your custom interest" });
    }

    // 2. Instantiate and save the model
    const newConnection = new Connection({
        name,
        email,
        phone,
        interests,
        customInterest,
        message
    });

    const savedDoc = await newConnection.save();

    // 3. Return success response
    return res.status(201).json({
        success: true,
        message: "Inquiry submitted successfully",
        data: savedDoc
    });
});

module.exports = { submitConnection };