
const admin = require("firebase-admin");

async function verifyEcoAction(req, res) {
  try {
    const { actionId, adminId, status } = req.body;

    if (!actionId || !adminId || !status) {
      return res.status(400).json({ error: "Missing required verification fields." });
    }

    const actionRef = admin.firestore().collection("actions").doc(actionId);
    const actionDoc = await actionRef.get();

    if (!actionDoc.exists) {
      return res.status(404).json({ error: "Action not found." });
    }

    await actionRef.update({
      status: status, 
      verifiedBy: adminId,
      verifiedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return res.status(200).json({ success: true, message: `Action status updated to ${status}.` });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ error: "Failed to verify action." });
  }
}

module.exports = { verifyEcoAction };
