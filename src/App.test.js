import { getAvailability } from './logic';

test('Vérifie que la disponibilité est correcte pour 2026', () => {
    expect(getAvailability(2026)).toBe("Disponible pour stage de fin d'étude");
});