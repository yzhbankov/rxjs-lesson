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

function setValueTextToOption(option: HTMLOptionElement, value: string, text: string) {
    option.value = value;
    option.text = text
}

export function createFilterControl(containerElement: HTMLDivElement) {
    const filterControl: HTMLDivElement = document.createElement('div');
    const statusSelect: HTMLSelectElement = document.createElement('select');
    const genderSelect: HTMLSelectElement = document.createElement('select');

    filterControl.className = 'filter-control';
    statusSelect.className = 'statusElement';
    genderSelect.className = 'genderElement';

    const genderOptionAll = document.createElement('option');
    const genderOptionFemale = document.createElement('option');
    const genderOptionMale = document.createElement('option');
    const genderOptionUnknown = document.createElement('option');
    const statusOptionAlive = document.createElement('option');
    const statusOptionAll = document.createElement('option');
    const statusOptionDead = document.createElement('option');
    const statusOptionUnknown = document.createElement('option');

    setValueTextToOption(genderOptionAll, '', 'All');
    setValueTextToOption(genderOptionFemale, 'Female', 'Female');
    setValueTextToOption(genderOptionMale, 'Male', 'Male');
    setValueTextToOption(genderOptionUnknown, 'unknown', 'unknown');
    setValueTextToOption(statusOptionAlive, 'Alive', 'Alive');
    setValueTextToOption(statusOptionAll, '', 'All');
    setValueTextToOption(statusOptionDead, 'Dead', 'Dead');
    setValueTextToOption(statusOptionUnknown, 'unknown', 'unknown');

    statusSelect.appendChild(statusOptionAll);
    statusSelect.appendChild(statusOptionAlive);
    statusSelect.appendChild(statusOptionDead);
    statusSelect.appendChild(statusOptionUnknown);
    genderSelect.appendChild(genderOptionAll);
    genderSelect.appendChild(genderOptionFemale);
    genderSelect.appendChild(genderOptionMale);
    genderSelect.appendChild(genderOptionUnknown);

    filterControl.appendChild(statusSelect);
    filterControl.appendChild(genderSelect);
    containerElement.appendChild(filterControl);
}
