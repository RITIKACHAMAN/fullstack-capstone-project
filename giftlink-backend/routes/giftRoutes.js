const express = require('express');
const router = express.Router();   // Defines the router
const connectToDatabase = require('../models/db');
const logger = require('../logger');

// Get all gifts
router.get('/', async (req, res, next) => {
    logger.info('/ called');
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gifts = await collection.find({}).toArray();
        res.json(gifts);
    } catch (e) {
        logger.error('Oops, something went wrong', e);
        next(e);
    }
});

// Get a single gift by ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gift = await collection.findOne({ id: id });

        if (!gift) {
            return res.status(404).json({ error: "Gift not found" });
        }

        res.json(gift);
    } catch (error) {
        next(error);
    }
});

// Add a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const result = await collection.insertOne(req.body);
        // Note: insertOne in newer MongoDB versions returns `result.insertedId`, not ops
        const newGift = await collection.findOne({ _id: result.insertedId });
        res.status(201).json(newGift);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
