/*jshint esversion: 8 */

// Task 1: Import the Natural library
const natural = require("natural");
const express = require("express");

// Task 2: Initialize the Express server
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Task 3: Create a POST /sentiment endpoint
app.post("/sentiment", (req, res) => {
    try {
        // Task 4: Extract the sentence parameter from the request body
        const { sentence } = req.body;

        if (!sentence) {
            return res.status(400).json({ error: "Please provide a sentence for analysis" });
        }

        // Create a sentiment analyzer (using AFINN-based analyzer)
        const Analyzer = natural.SentimentAnalyzer;
        const stemmer = natural.PorterStemmer;
        const analyzer = new Analyzer("English", stemmer, "afinn");

        // Tokenize the sentence into words
        const tokenizer = new natural.WordTokenizer();
        const tokens = tokenizer.tokenize(sentence);

        // Get the sentiment score
        const sentimentScore = analyzer.getSentiment(tokens);

        // Task 5: Determine positive, neutral, or negative sentiment
        let sentiment = "neutral";
        if (sentimentScore < 0) {
            sentiment = "negative";
        } else if (sentimentScore > 0.33) {
            sentiment = "positive";
        }

        // Task 6: Send success response
        res.status(200).json({ sentimentScore, sentiment });
    } catch (error) {
        // Task 7: Handle any errors
        res.status(500).json({ error: "Failed to analyze sentiment", details: error.message });
    }
});

// Define a port to start the server
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Sentiment analysis server running on port ${PORT}`);
});
