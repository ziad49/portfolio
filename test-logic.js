const { getProfileData } = require('./src/logic');

try {
    const data = getProfileData();
    if (data.name === "Ziad FREIJ") {
        console.log("TEST PASSED: Name is correct");
        process.exit(0);
    } else {
        console.error("TEST FAILED: Name mismatch");
        process.exit(1);
    }
} catch (e) {
    console.error("TEST CRASHED:", e);
    process.exit(1);
}