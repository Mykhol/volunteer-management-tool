import {JWT} from "google-auth-library";
import {gmail_v1} from "@googleapis/gmail/v1";
import Gmail = gmail_v1.Gmail;
import {Email} from "../model/Email";
import {AppResponse} from "../../network/model/AppResponse";
const path = require("path")

/**
 * A server-service used to access the Gmail API
 */
export class GMailService {

    /**
     * The client library of the Gmail API.
     */
    gmailClient: Gmail

    constructor() {
        this.gmailClient = this.init()
    }

    /**
     * Init the Gmail API.
     */
    init = () => {
        const gmail = require('@googleapis/gmail')
        // Setting up JWT as per: https://github.com/googleapis/google-api-nodejs-client/issues/2322
        const authClient = new JWT({
            keyFile: path.resolve(__dirname, "../../../../../private_keys/gmail_service_account.json"),
            scopes: ['https://mail.google.com/'],
            subject: "app@nunc.co.nz",
        })

        authClient.authorize().then()

        return gmail.gmail({
            version: 'v1',
            auth: authClient
        });
    }

    /**
     * Given an `Email` this method uses the server-service to send the email.
     *
     * @param email
     */
    sendEmail = async (email: Email) => {

        const emailResp = await this.gmailClient.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: email.getMessage()
            }
        })

        /**
         * If the above promise is not made then return an error
         */
        if (emailResp.status.isSuccessful()) {
            return new AppResponse(emailResp.status, emailResp)
        } else {
            return new AppResponse(500, emailResp)
        }
    }

}
