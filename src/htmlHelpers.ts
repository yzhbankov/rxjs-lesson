import { ICharacter, ICharacterLocation } from './models';

export function createCharactersList(containerElement: HTMLDivElement, characters: ICharacter[]) {
    containerElement.innerHTML = '';
    characters.forEach(character => {
        const characterTag: HTMLDivElement = document.createElement('div');
        const characterLinkTag: HTMLAnchorElement = document.createElement('a');

        characterLinkTag.innerHTML = character.name;
        characterLinkTag.className = 'character';
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


export function openModalHandler() {
    const modal: HTMLDivElement = document.getElementById('myModal') as HTMLDivElement;
    const btn: HTMLButtonElement = document.getElementById("myBtn") as HTMLButtonElement;
    const span: HTMLSpanElement = document.getElementsByClassName("close")[0] as HTMLSpanElement;

    btn.onclick = function() {
        modal.style.display = "block";
    };

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

export function onCharacterClick(data: any) {
    const { characterData, locationData } = data;
    const modal: HTMLDivElement = document.getElementById("modalWrapper") as HTMLDivElement;
    modal.innerHTML = '';

    const characterInfo = createCharacterInfo(characterData);
    const locationInfo = createLocationInfo(locationData);

    modal.appendChild(characterInfo);
    modal.appendChild(locationInfo);

    const btn: HTMLButtonElement = document.getElementById("myBtn") as HTMLButtonElement;
    btn.click();
}

export function createCharacterInfo(characterData: any){
    const characterInfo = document.createElement('div');

    const title = document.createElement('h2');
    title.innerText = 'Character info';
    const createdAt = document.createElement('div');
    createdAt.innerText = `Created at: ${characterData.created}`;
    const status = document.createElement('div');
    status.innerText = `Status: ${characterData.status}`;
    const gender = document.createElement('div');
    gender.innerText = `Gender: ${characterData.gender}`;
    const name = document.createElement('div');
    name.innerText = `Name: ${characterData.name}`;
    const species = document.createElement('div');
    species.innerText = `Species: ${characterData.species}`;
    const avatar = document.createElement('img');
    avatar.src = characterData.image;

    characterInfo.appendChild(title);
    characterInfo.appendChild(avatar);
    characterInfo.appendChild(name);
    characterInfo.appendChild(gender);
    characterInfo.appendChild(status);
    characterInfo.appendChild(createdAt);
    characterInfo.appendChild(species);
    return characterInfo
}

export function createLocationInfo(locationData: any){
    const locationInfo = document.createElement('div');

    const title = document.createElement('h2');
    title.innerText = 'Location info';
    const createdAt = document.createElement('div');
    createdAt.innerText = `Created at: ${locationData.created}`;
    const type = document.createElement('div');
    type.innerText = `Type: ${locationData.type}`;
    const name = document.createElement('div');
    name.innerText = `Name: ${locationData.name}`;

    locationInfo.appendChild(title);
    locationInfo.appendChild(createdAt);
    locationInfo.appendChild(name);
    locationInfo.appendChild(type);

    return locationInfo
}
