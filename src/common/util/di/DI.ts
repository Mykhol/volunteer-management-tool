/**
 * This class will act as a dependency injector / service manager for easy access to all services.
 */
import {GMailService} from "@/module/email/GMailService";
import {SpendingRequestService} from "@/module/spending-request/SpendingRequestService";
import {FirebaseAdminService} from "@/module/firestore/FirebaseAdminService";
import {UserService} from "@/module/user/UserService";
import {MemberService} from "@/module/member/service/MemberService";

export class DI {

    static FirebaseAdminService = new FirebaseAdminService()
    static SpendingRequestService = new SpendingRequestService(DI.FirebaseAdminService)
    static UserService = new UserService(DI.FirebaseAdminService)
    static MemberService = new MemberService(DI.FirebaseAdminService)


    // static EmailService = new GMailService()

}