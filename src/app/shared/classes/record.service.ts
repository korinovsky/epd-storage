import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {catchError, map, switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Observable, of, throwError} from 'rxjs';
import {Record} from '~models/record.model';
import {isMoment} from 'moment';
import {Error} from '~models/error.model';
import {FirebaseError} from 'firebase';
import autobind from 'autobind-decorator';

const mapDocument = doc => ({
    id: doc.id,
    ...doc.data()
});

export abstract class AbstractRecordService<T extends Record> {
    private collection: AngularFirestoreCollection<T>;

    set path(value: string) {
        this.collection = value ? this.angularFirestore.collection<T>(value) : null;
    }

    protected constructor(
        private angularFirestore: AngularFirestore,
        path?: string
    ) {
        this.path = path;
    }

    getByRef$(ref: DocumentReference): Observable<T> {
        return this.get$(ref.id);
    }

    get$(id: string): Observable<T> {
        return this.collection.doc(id).get().pipe(
            catchError(this.handleError$),
            switchMap(doc => doc.exists ? of(mapDocument(doc)) : throwError(Error.NotFound))
        );
    }

    getDocumentRef$(id: string): DocumentReference {
        return this.collection.doc<T>(id).ref;
    }

    list$(): Observable<T[]> {
        return this.collection?.snapshotChanges().pipe(
            catchError(this.handleError$),
            map(actions => actions.map(({payload: {doc}}) => mapDocument(doc)))
        );
    }

    delete$(id: string): Observable<void> {
        return fromPromise(this.collection.doc(id).delete());
    }

    add$(item: T): Observable<T> {
        const id = this.angularFirestore.createId();
        return this.update$({id, ...item});
    }

    update$(item: T): Observable<T> {
        const {id, ...itemData} = item;
        Object.keys(itemData).forEach(key => {
            if (isMoment(itemData[key])) {
                itemData[key] = itemData[key].toDate();
            }
        });
        return fromPromise(this.collection.doc(id).set(itemData)).pipe(
            map(() => item)
        );
    }

    @autobind
    private handleError$(error: FirebaseError): Observable<never> {
        console.error(error);
        return throwError(error);
    }
}
