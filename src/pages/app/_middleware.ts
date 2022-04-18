import type {NextFetchEvent, NextRequest} from 'next/server'
import {UserScope} from "@module/user/model/UserScope";
import {scopedRoute} from "@module/auth/api/ScopedRoute";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    // scopedRoute returns a next response.
    return await scopedRoute(UserScope.ADMIN, req)

}