import {AngularFirestore, AngularFirestoreCollection, fromDocRef} from "@angular/fire/firestore";
import {first, map, switchMap} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";
import {Observable} from "rxjs";

export interface Record {
    id: string;
}

const mapDocument = payload => ({
    id: payload.id,
    ...payload.data()
});

export abstract class AbstractRecordService<T extends Record> {
    private collection: AngularFirestoreCollection<T>;

    constructor(afs: AngularFirestore) {
        this.collection = afs.collection<T>('epds');
    }

    delete(id: string): Observable<void> {
        return fromPromise(this.collection.doc(id).delete());
    }

    add(item: T): Observable<T> {
        return fromPromise(this.collection.add(item)).pipe(
            switchMap(ref => fromDocRef<T>(ref)),
            first(),
            map(({payload}) => mapDocument(payload))
        );
    }

    list(): Observable<T[]> {
        return this.collection.snapshotChanges().pipe(
            map(actions => actions.map(({payload: {doc}}) => mapDocument(doc)))
        );
    }
}
