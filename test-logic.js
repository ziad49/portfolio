const { getProfileData } = require('./src/logic');

try {
    const data = getProfileData();
    let errors = [];

    // 1. Test du nom
    if (data.name !== "Ziad FREIJ") {
        errors.push(`Name mismatch: expected "Ziad FREIJ" but got "${data.name}"`);
    }

    // 2. Test de la format email 
    if (!data.email.includes("@")) {
        errors.push(`Invalid email format: "${data.email}"`);
    }

    // Vérification finale
    if (errors.length === 0) {
        console.log("ALL TESTS PASSED: Profile data is valid.");
        process.exit(0);
    } else {
        console.error("TESTS FAILED:");
        errors.forEach(err => console.error(`  - ${err}`));
        process.exit(1);
    }

} catch (e) {
    console.error("TEST CRASHED:", e);
    process.exit(1);
}