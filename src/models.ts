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

export interface ICharacterLocation {
    created: string;
    dimension: string;
    id: number;
    name: string;
    residents: string[];
    type: string;
    url: string;
}


export interface IApplication {
    setFilter(filter: string, value: string): void;
    getSourceForCurrentPage(): string;
    navToPrevPage(): void;
    navToNextPage(): void;
    getCharacters(): ICharacter[];
}

