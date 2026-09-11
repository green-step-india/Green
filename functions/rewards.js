const admin = require("firebase-admin");

async function claimReward(req, res) {
  try {
    const { userId, rewardId, pointCost } = req.body;

    if (!userId || !rewardId || !pointCost) {
      return res.status(400).json({ error: "Missing required reward parameters." });
    }

    const userRef = admin.firestore().collection("users").doc(userId);
    
    await admin.firestore().runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists) {
        throw new Error("User not found.");
      }

      const currentPoints = userDoc.data().points || 0;
      if (currentPoints < pointCost) {
        throw new Error("Insufficient points.");
      }

      transaction.update(userRef, { points: currentPoints - pointCost });
      
      const redemptionRef = admin.firestore().collection("redemptions").doc();
      transaction.set(redemptionRef, {
        userId,
        rewardId,
        redeemedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });

    return res.status(200).json({ success: true, message: "Reward claimed successfully!" });
  } catch (error) {
    console.error("Reward error:", error);
    return res.status(500).json({ error: error.message || "Failed to claim reward." });
  }
}

module.exports = { claimReward };
