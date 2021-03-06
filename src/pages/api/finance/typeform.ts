import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {TypeFormWebhook, TypeFormWebhookProps} from "@module/typeform/model/TypeFormWebhook";
import {SpendingRequest} from "@module/spending-request/model/SpendingRequest";
import {SpendingRequestTFRef} from "@module/spending-request/model/SpendingRequestTFRef";
import {now} from "lodash";
import {DI} from "@common/di/DI";
import {Email, EmailProps} from "@module/email/model/Email";
import {GMailService} from "@module/email/service/GMailService";

/**
 * Handles `/api/finance/typeform`
 *
 * Creates a spending request given the correct Typeform parameters.
 */
const handler : NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    // Convert the request body into a typeform webhook object
    const webhook = new TypeFormWebhook(req.body as TypeFormWebhookProps)

    const spendingRequest = new SpendingRequest({
        amount: webhook.findAnswer(SpendingRequestTFRef.AMOUNT)!!,
        date: webhook.findAnswer(SpendingRequestTFRef.DATE)!!,
        doc: webhook.findAnswer(SpendingRequestTFRef.DOCS),
        link: webhook.findAnswer(SpendingRequestTFRef.LINKS),
        gstInclusive: webhook.findAnswer(SpendingRequestTFRef.GST)!!,
        spendingDetails: webhook.findAnswer(SpendingRequestTFRef.SPENDING_DETAILS)!!,
        spendingReason: webhook.findAnswer(SpendingRequestTFRef.REASON)!!,
        submitTimeStamp: now(),
        submitter: webhook.findAnswer(SpendingRequestTFRef.EMAIL)!!,
        budget:
            webhook.findAnswer(SpendingRequestTFRef.BUDGET) ||
            webhook.findAnswer(SpendingRequestTFRef.BUDGET_CUSTOM) ||
            null
    })

    await DI.SpendingRequestService.addSpendingRequest(spendingRequest).then(async (resp) => {
        if (resp != undefined) {
            const emailResp = await new GMailService().sendEmail(new Email({
                to: "michael.h@pyf.org.nz",
                subject: "New Spending Request",
                content: [
                    'A new spending request was made by: ' + resp.submitter,
                    'You can view this spending request <a href=\"http://localhost:3000/app/finance/spending-requests/' + resp.id +'\">here.</a>'
                ]
            } as EmailProps))

            if (emailResp.isSuccessful()) {
                res.status(emailResp.status).json( emailResp.body)
            } else {
                res.status(emailResp.status).json( emailResp.errorBody)
            }
        } else {
            res.status(500).send(resp)
            return
        }
    })

    res.status(500)
    return

}

export default handler