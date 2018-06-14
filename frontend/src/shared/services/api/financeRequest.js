import { authRequest } from './request';

function getFinanceRequests() {
    return authRequest({
        url: `/financerequests/all`,
        method: 'GET'
    });
}

function bidOnFinanceRequest(id, amount) {
    return authRequest({
        url: `/financerequests/${id}/bid`,
        method: 'POST',
        data: {
            amount
        }
    });
}

function getMyAcceptedFinanceRequests() {
    return authRequest({
        url: `/financerequests/acceptedbids`,
        method: 'GET'
    });
}

function acceptBid(requestId, state, bidId) {
    return authRequest({
        url: `/financerequests/${requestId}/status/${state}/${bidId}`,
        method: 'PUT'
    });
}

const FinanceRequestService = {
    getFinanceRequests,
    bidOnFinanceRequest,
    getMyAcceptedFinanceRequests,

    acceptBid
};

export default FinanceRequestService;
