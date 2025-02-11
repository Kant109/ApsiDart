interface Stats {
    players: Array<Player>,
    evolutionScore: {
        [key: string]: Array<number>;
    },
    evolutionPosition: {
        [key: string]: Array<number>;
    },
}