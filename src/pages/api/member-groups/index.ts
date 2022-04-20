import {NextApiRequest, NextApiResponse} from "next";

/**
 * Handles the 'api/member-groups' endpoint.
 *
 * If the HTTP Method is GET the handler should return all member groups, if the HTTP Method is POST the handler should,
 * create a new member group.
 *
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // return all the member groups
    if (req.method == "GET") {

    }

    // create a new member group
    if (req.method == "POST") {

    }
}