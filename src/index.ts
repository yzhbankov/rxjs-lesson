import { Observable, of, fromEvent, merge } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, catchError, mergeMap } from 'rxjs/operators';
import './styles.scss';

import { State } from './state';
import { createObservables } from './observables';
import { createCharactersList, createPaginationControl, createFilterControl, openModalHandler } from './htmlHelpers';

const state = new State();
let prevState = {};

const inputElement: HTMLInputElement = document.querySelector('.inputElement') as HTMLInputElement;
const containerElement: HTMLDivElement = document.querySelector('.containerElement') as HTMLDivElement;
const navigationElement: HTMLDivElement = document.querySelector('.navigationElement') as HTMLDivElement;
const filterElement: HTMLDivElement = document.querySelector('.filterElement') as HTMLDivElement;

openModalHandler();
createPaginationControl(navigationElement);
createFilterControl(filterElement);

const statusElement: HTMLSelectElement = document.querySelector('.statusElement') as HTMLSelectElement;
const genderElement: HTMLSelectElement = document.querySelector('.genderElement') as HTMLSelectElement;

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

const search$: Observable<State> = fromEvent(inputElement, 'change')
    .pipe(
        map((event: Event) => {
            const element: HTMLInputElement = event.target as HTMLInputElement;
            state.setFilter('search', element.value);
            return Object.assign(new State(), state)
        })
    );

const statusFilter$: Observable<State> = fromEvent(statusElement, 'change')
    .pipe(
        map((event: Event) => {
            const element: HTMLInputElement = event.target as HTMLInputElement;

            state.setFilter('status', element.value);
            return Object.assign(new State(), state)
        })
    );

const statusGender$: Observable<State> = fromEvent(genderElement, 'change')
    .pipe(
        map((event: Event) => {
            const element: HTMLInputElement = event.target as HTMLInputElement;

            state.setFilter('gender', element.value);
            return Object.assign(new State(), state)
        })
    );

const application$ = merge(
    initialDataLoading$,
    navigation$,
    search$,
    statusFilter$,
    statusGender$
);

application$.subscribe(state => {
    if (state != prevState) {
        createCharactersList(containerElement, state.getCharacters());
        createObservables();
        prevState = state;
    }
});

