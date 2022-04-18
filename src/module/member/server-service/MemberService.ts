import {FirestoreService} from "@module//firestore/service/FirestoreService"
import {Member} from "@module/member/model/Member"
import {Firestore} from "firebase-admin/firestore"
import {FirestoreCollection} from "@module/firestore/model/FirestoreCollection"
import {dataConverter} from "@module/firestore/util/DataConverter"
import {Query} from "@module/firestore/model/Query"

export class MemberService extends FirestoreService<Member> {

    constructor(firestore: Firestore) {
        super(firestore, FirestoreCollection.MEMBERS, dataConverter<Member>());
    }

    async addMember(member: Member) {
        return await super.addDoc(member)
    }

    async getAllMembers() {
        return await this.getDocs()
    }

    async getMember(id: string) {
        return await this.getDoc(new Query("id", "==", id))
    }

    async updateMember(member: Member) {
        return await this.updateDoc(member)
    }

    async deleteMember(memberId: string) {
        return this.deleteDoc(memberId);
    }

}