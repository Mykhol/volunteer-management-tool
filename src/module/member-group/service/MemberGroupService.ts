import {FirestoreService} from "@module/firestore/service/FirestoreService";
import {MemberGroup} from "@module/member-group/model/MemberGroup";
import {FirestoreCollection} from "@module/firestore/model/FirestoreCollection";
import {dataConverter} from "@module/firestore/util/DataConverter";
import {Firestore} from "firebase-admin/firestore"


export class MemberGroupService extends FirestoreService<MemberGroup> {

    constructor(firestore: Firestore) {
        super(firestore, FirestoreCollection.MEMBER_GROUPS, dataConverter<MemberGroup>());
    }

    async addMemberGroup(memberGroup: MemberGroup) {
        return await super.addDoc(memberGroup)
    }

    async getAllMemberGroups() {
        return await this.getDocs()
    }

}