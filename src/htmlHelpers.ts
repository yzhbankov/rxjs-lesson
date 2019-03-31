import { ICharacter } from './models';

export function createCharactersList(containerElement: HTMLDivElement, characters: ICharacter[]) {
    containerElement.innerHTML = '';
    characters.forEach(character => {
        const characterTag: HTMLDivElement = document.createElement('div');
        const characterLinkTag: HTMLAnchorElement = document.createElement('a');

        characterLinkTag.innerHTML = character.name;
        characterLinkTag.setAttribute('href', character.url);

        characterTag.appendChild(characterLinkTag);
        containerElement.appendChild(characterTag);
    })
}

export function createPaginationControl(containerElement: HTMLDivElement) {
    const navigationControl: HTMLDivElement = document.createElement('div');
    const prevButton: HTMLButtonElement = document.createElement('button');
    const nextButton: HTMLButtonElement = document.createElement('button');
    navigationControl.className = 'navigation-control';
    prevButton.className = 'prev-button';
    nextButton.className = 'next-button';
    prevButton.innerHTML = 'Prev';
    nextButton.innerHTML = 'Next';

    navigationControl.appendChild(prevButton);
    navigationControl.appendChild(nextButton);
    containerElement.appendChild(navigationControl);
}
