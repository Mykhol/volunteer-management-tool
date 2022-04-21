/**
 * This class will act as a dependency injector / server-service manager for easy access to all services.
 */
import {GMailService} from "@module/email/service/GMailService";
import {SpendingRequestService} from "@module/spending-request/service/SpendingRequestService";
import {FirebaseAdminService} from "@module/firestore/service/FirebaseAdminService";
import {UserService} from "@module/user/service/UserService";
import {MemberService} from "@module/member/server-service/MemberService";
import {MemberGroupService} from "@module/member-group/service/MemberGroupService";

export class DI {

    static FirebaseAdminService = new FirebaseAdminService()
    static SpendingRequestService = new SpendingRequestService(DI.FirebaseAdminService.getFirestore())
    static UserService = new UserService(DI.FirebaseAdminService)
    static MemberService = new MemberService(DI.FirebaseAdminService.getFirestore())
    static MemberGroupService = new MemberGroupService(DI.FirebaseAdminService.getFirestore())


    // static EmailService = new GMailService()

}