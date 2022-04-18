import {Member} from "../../member/model/Member";

/**
 * Class that represents a group of members
 */
export class MemberGroup {

    /**
     * @param id
     * @param name
     * @param members
     */
    constructor(public id: string | null,
                public name: string,
                public members: {id: string, fullName: string}[]
    ) {}

}