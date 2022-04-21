import AppPage from "@common/component/pages/AppPage";
import {SpendingRequest} from "@module/spending-request/model/SpendingRequest";
import {useState} from "react";
import useSWR from "swr";
import SpendingRequestTable from "@module/spending-request/component/SpendingRequestTable";
import SpendingRequestForm from "@module/spending-request/component/SpendingRequestForm";

const SpendingRequestsPage = () => {

    const [spendingRequest, setSpendingRequest] = useState<SpendingRequest>()

    const {data} = useSWR("/api/spending-requests")

    return (
        <AppPage>
            <SpendingRequestTable spendingRequests={data}></SpendingRequestTable>
            {spendingRequest ? <SpendingRequestForm spendingRequest={spendingRequest} /> : null}
        </AppPage>
    )

}

export default SpendingRequestsPage