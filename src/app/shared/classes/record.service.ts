import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Observable} from 'rxjs';
import {Record} from '~models/record.model';

const mapDocument = doc => ({
    id: doc.id,
    ...doc.data()
});

export abstract class AbstractRecordService<T extends Record> {
    private collection: AngularFirestoreCollection<T>;

    protected constructor(
        path: string,
        private angularFirestore: AngularFirestore
    ) {
        this.collection = angularFirestore.collection<T>(path);
    }

    get(id: string): Observable<T> {
        return this.collection.doc(id).get().pipe(
            map(mapDocument)
        );
    }

    list(): Observable<T[]> {
        return this.collection.snapshotChanges().pipe(
            map(actions => actions.map(({payload: {doc}}) => mapDocument(doc)))
        );
    }

    delete(id: string): Observable<void> {
        return fromPromise(this.collection.doc(id).delete());
    }

    add(item: T): Observable<T> {
        const id = this.angularFirestore.createId();
        return this.update({id, ...item});
    }

    update(item: T): Observable<T> {
        const {id, ...itemData} = item;
        return fromPromise(this.collection.doc(id).set(itemData)).pipe(
            map(() => item)
        );
    }
}
