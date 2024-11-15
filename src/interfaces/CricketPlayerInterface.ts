interface CricketPlayer {
    id: number,
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
        20: number,
        19: number,
        18: number,
        17: number,
        16: number,
        15: number,
        25: number
    },
    volleys: Array<Array<string>>
}