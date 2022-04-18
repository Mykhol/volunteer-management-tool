import {FirestoreService} from "@module/firestore/service/FirestoreService";
import {User} from "@module/user/model/User";
import {FirestoreCollection} from "@module/firestore/model/FirestoreCollection";
import {Query} from "@module/firestore/model/Query";
import {dataConverter} from "@module/firestore/util/DataConverter";
import {FirebaseAdminService} from "@module/firestore/service/FirebaseAdminService";

export class UserService extends FirestoreService<User> {

    constructor(public firebaseAdmin: FirebaseAdminService) {
        super(firebaseAdmin.firestore, FirestoreCollection.USERS, dataConverter<User>());
    }

    async addUser(appUser: User) {
        return await super.addDoc(appUser)
    }

    async getUserByUid(uid: string) : Promise<User | undefined> {
        return await super.getDoc(new Query("googleUid", "==", uid))
    }

    async getUserById(id: string) : Promise<User | undefined> {
        return await super.getDoc(new Query("id", "==", id))
    }

    async getUserByEmail(email: string) : Promise<User | undefined> {
        return await super.getDoc(new Query("primaryEmail", "==", email))
    }

    async getUserFromToken(token: string) : Promise<User | undefined> {
        const decodedToken = await this.firebaseAdmin.getAuth().verifyIdToken(token)

        return await this.getUserByUid(decodedToken.uid).then((doc) => {
            if (doc) {
                return doc
            } else {
                return undefined
            }
        })
    }

    async getAllUsers() {
        return await this.getDocs()
    }

    async updateUser(user: User) {
        return await this.updateDoc(user)
    }

    async removeUser(userId: string) {
        return this.deleteDoc(userId);
    }
}