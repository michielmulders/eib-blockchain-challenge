import { authRequest } from './request';

function getCommercialPapers() {
    return authRequest({
        url: `/commercialPapers`,
        method: 'GET'
    });
}

function getCommercialPaper(commercialPaperId) {
    return authRequest({
        url: `/commercialPapers/${commercialPaperId}`,
        method: 'GET'
    });
}

function getCommercialPaperHistory(commercialPaperId) {
    return authRequest({
        url: `/commercialPapers/${commercialPaperId}/history`,
        method: 'GET'
    });
}

function getCommercialPaperRequest(commercialPaperId) {
    return authRequest({
        url: `/commercialPapers/${commercialPaperId}/financerequest`,
        method: 'GET'
    });
}

function updateCommercialPaperstatus(id, state) {
    return authRequest({
        url: `/commercialPapers/${id}/status/${state}`,
        method: 'PUT'
    });
}

function createCommercialPaper(data) {
    return authRequest({
        url: `/commercialPapers`,
        method: 'POST',
        data
    });
}

const commercialPaperservice = {
    getCommercialPapers,
    updateCommercialPaperstatus,
    getCommercialPaper,
    getCommercialPaperRequest,
    getCommercialPaperHistory,
    createCommercialPaper
};

export default commercialPaperservice;
