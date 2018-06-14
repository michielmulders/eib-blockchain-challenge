import { authRequest } from './request';

function getInvoices() {
    return authRequest({
        url: `/invoices`,
        method: 'GET'
    });
}

function getInvoice(invoiceId) {
    return authRequest({
        url: `/invoices/${invoiceId}`,
        method: 'GET'
    });
}

function getInvoiceHistory(invoiceId) {
    return authRequest({
        url: `/invoices/${invoiceId}/history`,
        method: 'GET'
    });
}

function getInvoiceRequest(invoiceId) {
    return authRequest({
        url: `/invoices/${invoiceId}/financerequest`,
        method: 'GET'
    });
}

function updateInvoiceStatus(id, state) {
    return authRequest({
        url: `/invoices/${id}/status/${state}`,
        method: 'PUT'
    });
}

function createInvoice(data) {
    return authRequest({
        url: `/invoices`,
        method: 'POST',
        data
    });
}

const InvoiceService = {
    getInvoices,
    updateInvoiceStatus,
    getInvoice,
    getInvoiceRequest,
    getInvoiceHistory,
    createInvoice
};

export default InvoiceService;
