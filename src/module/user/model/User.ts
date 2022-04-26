import {DataModel} from "../../firestore/model/DataModel";
import {UserScope} from "./UserScope";

export class User implements DataModel {

    constructor(
        public id: string | null,
        public firstName: string,
        public lastName: string,
        public primaryEmail: string,
        public secondaryEmail: string | null,
        public googleUid: string | null,
        public scope: UserScope[] | null,
        public picture: string | null
    ) {}

    static fromObj(obj: User): User {
        return new User(
            obj.id,
            obj.firstName,
            obj.lastName,
            obj.primaryEmail,
            obj.secondaryEmail,
            obj.googleUid,
            obj.scope,
            obj.picture
        )
    }

    isValid(): boolean {
        return !(
            this.firstName == "" ||
            this.lastName == "" ||
            this.primaryEmail == ""
        )
    }
}

