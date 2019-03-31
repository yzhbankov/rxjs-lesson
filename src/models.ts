export interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    },
    location: {
        name: string;
        url: string;
    },
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface IDetails {
    count: number;
    pages: number;
    next: string;
    prev: string;
}

export interface IResponse {
    info: IDetails;
    results: ICharacter[];
}


export interface IApplication {
    setFilter(filter: string): void;
    getSourceForCurrentPage(): string;
    navToPrevPage(): void;
    navToNextPage(): void;
    getCharacters(): ICharacter[];
}

