import {Component} from '@angular/core';
import {Epd} from "./storage.model";
import {Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-storage',
    templateUrl: './storage.component.html',
    styleUrls: ['./storage.component.scss']
})
export class StorageComponent {
    epds: Observable<Epd[]>;
    private epdsCollection: AngularFirestoreCollection<Epd>;

    constructor(private readonly afs: AngularFirestore) {
        this.epdsCollection = afs.collection<Epd>('epds');
        this.epds = this.epdsCollection.snapshotChanges().pipe(
            map(actions => actions.map(({payload: {doc}}) => ({
                id: doc.id,
                ...doc.data()
            })))
        );
    }

    remove({id}: Epd) {
        this.epdsCollection.doc(id).delete();
    }

    addEpd() {
        this.epdsCollection.add({} as Epd);
    }
}
