interface Player {
    id: string,
    pseudo: string,
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
        20: Array<boolean>,
        19: Array<boolean>,
        18: Array<boolean>,
        17: Array<boolean>,
        16: Array<boolean>,
        15: Array<boolean>,
        25: Array<boolean>,
    },
    volleys: Array<Array<string>>
}