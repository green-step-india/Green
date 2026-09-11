const admin = require("firebase-admin");

async function getUserProfile(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const userDoc = await admin.firestore().collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User profile not found." });
    }

    return res.status(200).json({ success: true, profile: userDoc.data() });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch user profile." });
  }
}

module.exports = { getUserProfile };

