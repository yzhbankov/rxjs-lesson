import { IApplication, ICharacter } from './models';

export class State implements IApplication {
    pages: number = 0;
    page: number = 1;
    filters = {
        search: '',
        status: '',
        gender: ''
    };
    source: string = 'https://rickandmortyapi.com/api/character/';
    characters: ICharacter[] = [];

    public setFilter(filter: string, value: string): void {
        switch(filter) {
            case('search'): {
                this.filters.search = value;
                break;
            }
            case('status'): {
                this.filters.status = value;
                break;
            }
            case('gender'): {
                this.filters.gender = value;
                break;
            }
        }
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
            const withSelectedStatus = character.status === this.filters.status || !this.filters.status;
            const withSelectedGender = character.gender === this.filters.gender || !this.filters.gender;
            const withSearchedName = character.name.indexOf(this.filters.search) !== -1;
            return withSearchedName &&  withSelectedGender && withSelectedStatus;
        })
    }
}
