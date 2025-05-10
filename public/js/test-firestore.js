import { addDocument, getDocuments } from './services/databaseService.js';

async function testConnection() {
  try {
    // Add test data
    await addDocument('test', { message: "Firestore connection works!", timestamp: new Date() });
    
    // Retrieve data
    const docs = await getDocuments('test');
    console.log("Retrieved documents:", docs);
    
    alert("Firestore connection successful! Check console for details.");
  } catch (error) {
    console.error("Connection test failed:", error);
    alert("Connection test failed: " + error.message);
  }
}

// Run test when page loads
window.onload = testConnection;