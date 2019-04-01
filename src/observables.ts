import { fromEvent } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

import { onCharacterClick } from './htmlHelpers';
import { ICharacter, ICharacterLocation } from './models';

export function createObservables() {
    const characters = document.querySelectorAll('.character');
    characters.forEach(character => {
        fromEvent(character, 'click')
            .pipe(
                map((event: Event) => {
                    event.preventDefault();
                    const element: HTMLAnchorElement = event.target as HTMLAnchorElement;
                    return element.href
                }),
                mergeMap((url) => ajax.get(url).pipe(map((res: AjaxResponse) => {
                    const { response } = res;
                    return response;
                }))),
                mergeMap((characterData: ICharacter) => ajax.get(characterData.location.url).pipe(map((res: AjaxResponse) => {
                    const locationData: ICharacterLocation = res.response;

                    return {
                        characterData,
                        locationData,
                    };
                })))
            )
            .subscribe(({characterData, locationData}) => {
                onCharacterClick({characterData, locationData})
            })
    })
}
