import { QueryDocumentSnapshot, FirestoreDataConverter } from "firebase-admin/firestore"


export const dataConverter = <T>() : FirestoreDataConverter<T> => ({
    toFirestore: (data: Partial<T>) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) =>
        snap.data() as T
})