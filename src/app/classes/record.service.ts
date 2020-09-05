import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
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

    protected constructor(
        path: string,
        private afs: AngularFirestore
    ) {
        this.collection = afs.collection<T>(path);
    }

    delete(id: string): Observable<void> {
        return fromPromise(this.collection.doc(id).delete());
    }

    add(item: T): Observable<T> {
        const id = this.afs.createId();
        return this.update({id, ...item});
    }

    update(item: T): Observable<T> {
        const {id, ...itemData} = item;
        return fromPromise(this.collection.doc(id).set(itemData)).pipe(
            map(() => item)
        );
    }

    list(): Observable<T[]> {
        return this.collection.snapshotChanges().pipe(
            map(actions => actions.map(({payload: {doc}}) => mapDocument(doc)))
        );
    }
}
