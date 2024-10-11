interface Player {
    id: string,
    pseudo: string,
    isActive: boolean,
    points: {
        20: number,
        19: number,
        18: number,
        17: number,
        16: number,
        15: number,
        25: number,
        total: number
    },
    doors: {
        20: [boolean, boolean, boolean],
        19: [boolean, boolean, boolean],
        18: [boolean, boolean, boolean],
        17: [boolean, boolean, boolean],
        16: [boolean, boolean, boolean],
        15: [boolean, boolean, boolean],
        25: [boolean, boolean, boolean],
    },
    volleys: Array<Array<string>>
}