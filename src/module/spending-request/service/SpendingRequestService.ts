import {FirestoreService} from "@module/firestore/service/FirestoreService";
import {SpendingRequest} from "@module/spending-request/model/SpendingRequest";
import {FirestoreCollection} from "@module//firestore/model/FirestoreCollection";
import {dataConverter} from "@module/firestore/util/DataConverter";
import {Query} from "@module/firestore/model/Query";
import {Firestore} from "firebase-admin/firestore"

/**
 * Service used to access spending request data in the database.
 */
export class SpendingRequestService extends FirestoreService<SpendingRequest> {

    constructor(firestore: Firestore) {
        super(firestore, FirestoreCollection.SPENDING_REQUESTS, dataConverter<SpendingRequest>());
    }

    public async addSpendingRequest(spendingRequest: SpendingRequest) {
        return await super.addDoc(spendingRequest)
    }

    async updateSpendingRequest(spendingRequest: SpendingRequest) {
        return await this.updateDoc(spendingRequest)
    }

    async removeSpendingRequest(id: string) {
        return this.deleteDoc(id);
    }

    async getAllSpendingRequests() {
        return this.getDocs()
    }

    async getSpendingRequest(id: string) {
        return this.getDoc(new Query("id", "==", id))
    }


}