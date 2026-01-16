import { getProfileData } from './logic';

test('Vérifie l’identité du propriétaire du portfolio', () => {
    const data = getProfileData();
    expect(data.name).toBe("Ziad FREIJ"); 
});

test('Vérifie le format de l’email de contact', () => {
    const data = getProfileData();
    expect(data.email).toContain("@"); 
});