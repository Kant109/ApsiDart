interface CricketPlayer {
    id: number,
    pseudo: string,
    firstName: string,
    name: string,
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
    volleys: Array<Array<string>>,
    elo?: Array<number>,
    avgPosition?: Array<number>,
    avgPoints?: Array<number>,
    pctVictory?: Array<number>,
    avgNbDartCompleted?: Array<number>,
    nbGame?: number,
    nbVictory?: number,
    chartData?: {
        labels: Array<any>,
        datasets: Array<any>
    },
}