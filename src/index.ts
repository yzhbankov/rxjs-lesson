import { Observable, of, fromEvent, merge } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { State } from './state';
import { createCharactersList, createPaginationControl } from './htmlHelpers';

const state = new State();
let prevState = {};

const inputElement: HTMLInputElement = document.querySelector('.inputElement') as HTMLInputElement;
const containerElement: HTMLDivElement = document.querySelector('.containerElement') as HTMLDivElement;
const navigationElement: HTMLDivElement = document.querySelector('.navigationElement') as HTMLDivElement;

createPaginationControl(navigationElement);

const initialDataLoading$: Observable<State> = ajax.get(state.getSourceForCurrentPage())
    .pipe(
        map((res: AjaxResponse) => {
            const { response } = res;
            if (response.info) {
                state.setPagesNumber(response.info.pages);
            }
            if (response.results) {
                state.setCharacters(response.results)
            }
            return state;
        }),
        catchError((error: any) => {
            console.log('errors: ', error);
            return of(error);
        })
    );

const navigation$: Observable<State> = fromEvent(navigationElement, 'click')
    .pipe(
        map((event: Event) => {
            const element: HTMLElement = event.target as HTMLElement;
            if (element.className === 'prev-button') {
                state.navToPrevPage();
            } else  if (element.className === 'next-button') {
                state.navToNextPage();
            }
            return Object.assign(new State(), state)
        }),
        mergeMap(() => ajax.get(state.getSourceForCurrentPage()).pipe(map((res: AjaxResponse) => {
            const { response } = res;
            if (response.results) {
                state.setCharacters(response.results)
            }
            return Object.assign(new State(), state);
        })))
    );

const filter$: Observable<State> = fromEvent(inputElement, 'change')
    .pipe(
        map((event: Event) => {
            const element: HTMLInputElement = event.target as HTMLInputElement;
            state.setFilter(element.value);
            return Object.assign(new State(), state)
        })
    );

const application$ = merge(
    initialDataLoading$,
    navigation$,
    filter$
);

application$.subscribe(state => {
    if (state != prevState) {
        createCharactersList(containerElement, state.getCharacters());
        prevState = state;
    }
});

