import { IApplication, ICharacter } from './models';

export class State implements IApplication {
    pages: number = 0;
    page: number = 1;
    filter: string = '';
    source: string = 'https://rickandmortyapi.com/api/character/';
    characters: ICharacter[] = [];

    public setFilter(filter: string) {
        this.filter = filter;
    }

    public getSourceForCurrentPage(): string {
        return `${this.source}?page=${this.page}`;
    }

    public navToPrevPage(): void {
        if (this.page > 1){
            this.page -= 1;
        }
    }

    public navToNextPage(): void {
        if (this.page < this.pages) {
            this.page += 1;
        }
    }

    public setPagesNumber(pages: number): void {
        this.pages = pages;
    }


    public setCharacters(characters: ICharacter[]): void {
        this.characters = characters;
    }

    public getCharacters(): ICharacter[] {
        return this.characters.filter((character: ICharacter) => {
            return character.name.indexOf(this.filter) !== -1
        })
    }
}
