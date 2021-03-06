import {CollectionReference, Firestore, FirestoreDataConverter} from "firebase-admin/firestore"
import {DataModel} from "@module/firestore/model/DataModel";
import {Query} from "@module/firestore/model/Query";
import classToDto from "@common/util/ClassToDto";

/**
 * Service that manages the data in firestore.
 */
export class FirestoreService<T extends DataModel> {

    /**
     * The collection that
     */
    collection: CollectionReference

    constructor(
        public firestore: Firestore,
        collectionPath: string,
        public converter: FirestoreDataConverter<T>
    ) {
        this.collection = firestore.collection(collectionPath).withConverter(converter)
    }

    async getDoc(query: Query){
        const querySnapshot = await this.collection.where(
            query.searchField,
            query.operator,
            query.searchValue).get()

        if (querySnapshot.docs.length == 1) {
            return this.converter.fromFirestore(querySnapshot.docs[0]);
        } else {
            return undefined
        }

    }

    async getDocs() {
        return this.collection.withConverter(this.converter).get().then((querySnapshot) => {
            return querySnapshot.docs.map((doc) => {
                return doc.data()
            })
        })
    }

    /**
     * Creates a new Firestore document with the [data] received, setting the document ID to the [data].
     */
    async addDoc(data: T) {
        const docRef = this.collection.doc()
        data.id = docRef.id
        await this.collection.doc(docRef.id).set(classToDto(data)).then((r) => {})
        return await this.getDoc(new Query("id", "==", data.id))
    }

    async updateDoc(data: T) {
        if (data.id != null) {
            const docRef = this.collection.doc(data.id!!)
            await this.collection.doc(docRef.id).set(classToDto(data)).then((r) => {
            })

            return await this.getDoc(new Query("id", "==", data.id!!))
        }
    }

    async deleteDoc(id: string) {
        await this.collection.doc(id).delete().then((r) => console.log(r))
    }
}