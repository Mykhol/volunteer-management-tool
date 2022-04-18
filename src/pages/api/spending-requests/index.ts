import {NextApiRequest, NextApiResponse} from "next";
import {DI} from "@common/util/di/DI";

/**
 * Handles the '/api/spending-requests' endpoint.
 *
 * If the HTTP Method is GET the handler should return all spending requests.
 *
 * @author Michael Howell (michael@nunc.co.nz)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method == "GET") {
        const requests = await DI.SpendingRequestService.getAllSpendingRequests()
        res.status(200).json(requests)
    }

}