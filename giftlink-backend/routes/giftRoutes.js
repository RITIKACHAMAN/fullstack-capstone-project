router.get("/gifts/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Task 1: Connect to MongoDB and store connection to db constant
      const db = await connectToDatabase();
  
      // Task 2: use the collection() method to retrieve the gift collection
      const collection = db.collection("gifts");
  
      // Task 3: Find a specific gift by ID using the collection.findOne method
      const gift = await collection.findOne({ id: id });
  
      if (!gift) {
        return res.status(404).json({ error: "Gift not found" });
      }
  
      res.json(gift);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gift" });
    }
  });
  