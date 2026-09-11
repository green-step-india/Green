const admin = require("firebase-admin");

async function recordEcoAction(req, res) {
  try {
    const { userId, actionType, description, imageUrl } = req.body;

    if (!userId || !actionType) {
      return res.status(400).json({ error: "User ID and action type are required." });
    }

    const actionData = {
      userId,
      actionType,
      description: description || "",
      imageUrl: imageUrl || "",
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: "pending_verification"
    };

    const docRef = await admin.firestore().collection("actions").add(actionData);

    return res.status(201).json({ 
      success: true, 
      actionId: docRef.id, 
      message: "Eco-action submitted successfully for review." 
    });
  } catch (error) {
    console.error("Error recording action:", error);
    return res.status(500).json({ error: "Failed to record eco-action." });
  }
}

module.exports = { recordEcoAction };
