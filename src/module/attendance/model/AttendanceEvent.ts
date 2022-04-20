import {MemberGroup} from "@module/member-group/model/MemberGroup";
import theme from "@common/component/util/style/theme";
import * as React from "react";

/**
 * Class that represents an event for which attendance is recorded.
 */
export class AttendanceEvent {

    constructor(public id: string | null,
                public name: string,
                public date: Date,
                public startTime: string,
                public endTime: string,
                public memberGroup: MemberGroup,
                public eventType: AttendanceEventType
    ) {}

}

export enum AttendanceEventType {
    GENERAL_WORKSHOP = "GENERAL_WORKSHOP",
    EVENT = "EVENT"
}