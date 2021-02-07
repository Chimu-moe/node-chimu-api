import fetch from "node-fetch";

export enum PlayMode {
    Osu = 0,
    Taiko = 1,
    CatchTheBeat = 2,
    Mania = 3,
}

export enum RankedStatus {
    Graveyard = -2,
    WIP = -1,
    Pending = 0,
    Ranked = 1,
    Approved = 2,
    Qualified = 3,
    Loved = 4
}

export enum Genre {
    Any = 0,
    Unspecified = 1,
    Game = 2,
    Anime = 3,
    Rock = 4,
    Pop = 5,
    Other = 6,
    Novelty = 7,
    HipHop = 9,
    Electronic = 10,
}

export enum Language {
    Any = 0,
    Other = 1,
    English = 2,
    Japanese = 3,
    Chinese = 4,
    Instrumental = 5,
    Korean = 6,
    French = 7,
    German = 8,
    Swedish = 9,
    Spanish = 10,
    Italian = 11
}

export interface SeachOptions {
    query?: string;
    amount?: number;
    offset?: number;
    rankedStatus?: RankedStatus;
    mode?: PlayMode;

    min_ar?: number;
    max_ar?: number
    min_od?: number;
    max_od?: number;
    min_cs?: number;
    max_cs?: number;
    min_hp?: number;
    max_hp?: number;

    min_diff?: number;
    max_diff?: number;
    min_bpm?: number;
    max_bpm?: number;
    min_length?: number;
    max_length?: number;

    genre?: Genre;
    language?: Language;
}


export interface Beatmap {
    BeatmapId: number;
    ParentSetId: number;
    DiffName: string;
    FileMD5: string;
    Mode: PlayMode;
    BPM: number;
    AR: number;
    OD: number;
    CS: number;
    HP: number;
    TotalLength: number;
    HitLength: number;
    Playcount: number;
    Passcount: number;
    MaxCombo: number;
    DifficultyRating: number;
    OsuFile: string;
    DownloadPath: string;
}

export interface BeatmapSet {
    SetId: number;
    ChildrenBeatmaps: Beatmap[];
    RankedStatus: RankedStatus;
    ApprovedDate: string;
    LastUpdate: string;
    LastChecked: string;
    Artist: string;
    Title: string;
    Creator: string;
    Source: string;
    Tags: string;
    HasVideo: boolean;
    Genre: Genre;
    Language: Language;
    Favourites: number;
    Disabled: boolean;
}

export enum ErrorCodes {
    OK = 0,
    INT_ERROR = 101,
    KEY_REQUIRED = 102,
    STATE_NOT_SET = 103,
    BEATMAP_NOT_FOUND = 104,
    BEATMAP_UNAVAILABLE = 105,
    NO_SEARCH_RESULTS = 106,
}

export interface Result<T> {
    code: ErrorCodes,
    message: string,
    data: T
}

export default class ChimuAPI {
    /**
     * Gets a beatmap from chimu's API
     */
    async getMap(mapId: number): Promise<Result<Beatmap>> {
        return (await fetch('https://api.chimu.moe/v1/map/' + mapId)).json();
    }

    /**
     * Gets a beatmap from chimu's API
     */
    async getSet(setId: number): Promise<Result<BeatmapSet>> {
        return (await fetch('https://api.chimu.moe/v1/set/' + setId)).json();
    }

    /**
    * Search for a Beatmap
    */
    async search(opts: SeachOptions) {
        let httpQuery = "";

        // Query builder
        for (var key in opts) {
            let value = opts[key];

            if (value === null || value === NaN || value === false || value === undefined)
                continue;

            if (httpQuery.length > 0)
                httpQuery += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            else
                httpQuery += `?${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }

        return (await fetch(`https://api.chimu.moe/v1/search${httpQuery}`)).json();
    }

    /**
    * Download a Beatmap
    */
    async download(setId: number, key: string, state: "hcaptcha" | "access"): Promise<Result<{}> | Buffer> {
        return (await fetch(`https://api.chimu.moe/v1/download/${setId}?k=${key}&s=${state}`)).json();
    }
}
