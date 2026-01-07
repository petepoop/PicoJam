export interface Pixel {
    x: number;
    y: number;
    color: string;
    char: string;
    gameObjectId: number;
}
export interface GameObject {
    name: string;
    x: number;
    y: number;
    sprite: Pixel[];
}
export interface Event {
    ID: number;
    positive: boolean;
    weight: number;
    title: string;
    description: string;
    options: Option[];
}
export interface Option {
    title: string;
    bonuses: Bonuses;
}
export interface Bonuses {
    gold: number;
    followers: number;
    faith: number;
    ores: number;
    research: number;
}
//# sourceMappingURL=types.d.ts.map