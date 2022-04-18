import AppPage from "@common/component/pages/AppPage";
import {SpendingRequest} from "@module/spending-request/model/SpendingRequest";
import {useState} from "react";
import useSWR from "swr";
import SpendingRequestTable from "@module/spending-request/component/SpendingRequestTable";

const SpendingRequestsPage = () => {

    const [spendingRequest, setSpendingRequest] = useState<SpendingRequest | null>(null)

    const {data} = useSWR("/api/spending-requests")

    return (
        <AppPage>
            <SpendingRequestTable spendingRequests={data}></SpendingRequestTable>
        </AppPage>
    )

}

export default SpendingRequestsPage