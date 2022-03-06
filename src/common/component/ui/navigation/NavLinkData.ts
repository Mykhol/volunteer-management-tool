import {AppURL} from "../../../util/AppURL";

export class NavLinkData {

    url: AppURL
    linkText: string

    constructor(url: AppURL, linkText: string) {
        this.url = url
        this.linkText = linkText
    }

}