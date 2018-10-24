import { Subject } from 'rxjs';
import { Note } from '../../src/entity/Note';

export const requestData$ = new Subject<any>();

export const toFullscreen$ = new Subject<Note>();
export const toList$ = new Subject<any>();