import {FirestoreService} from "@module/firestore/service/FirestoreService";
import {AttendanceEvent} from "@module/attendance/model/AttendanceEvent";
import {Firestore} from "firebase-admin/firestore"
import {FirestoreCollection} from "@module/firestore/model/FirestoreCollection";
import {dataConverter} from "@module/firestore/util/DataConverter";

export class AttendanceEventService extends FirestoreService<AttendanceEvent> {

    constructor(firestore: Firestore) {
        super(firestore, FirestoreCollection.ATTENDANCE_EVENTS, dataConverter<AttendanceEvent>());
    }

    async addAttendanceEvent(attendanceEvent: AttendanceEvent) {
        return await super.addDoc(attendanceEvent)
    }

    async getAllAttendanceEvents() {
        return await this.getDocs()
    }

}