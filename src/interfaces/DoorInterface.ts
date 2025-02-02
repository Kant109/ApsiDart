const doorValues = [
    "0",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "25",
] as const;
export type Door = (typeof doorValues)[number];