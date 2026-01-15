export const getAvailability = (year) => {
    if (year < 2025) return "Étudiant à l'ISEN";
    return "Disponible pour stage";
};