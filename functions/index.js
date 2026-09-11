
const functions = require("firebase-functions");
const admin = require("admin");
admin.initializeApp();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// Secure server-side endpoint for validating eco-actions
app.post("/verify-action", async (req, res) => {
  try {
    const { userId, actionType } = req.body;
    
    if (!userId || !actionType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Secure calculation on backend to prevent client-side tampering
    const pointsToAdd = actionType === "tree_planted" ? 50 : 10;
    
    const userRef = admin.firestore().collection("users").doc(userId);
    await admin.firestore().runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists) {
        throw new Error("User does not exist");
      }
      const currentPoints = userDoc.data().points || 0;
      transaction.update(userRef, { points: currentPoints + pointsToAdd });
    });

    return res.status(200).json({ success: true, addedPoints: pointsToAdd });
  } catch (error) {
    console.error("Error processing action:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.api = functions.https.onRequest(app);
