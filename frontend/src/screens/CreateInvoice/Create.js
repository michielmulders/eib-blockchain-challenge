import React from 'react';
import { connect } from 'react-redux';
import './index.css';
import {
    Button,
    Card,
    DatePicker,
    Form,
    Icon,
    Input,
    InputNumber,
    Radio,
    Select,
    Upload
} from 'antd';
import InvoiceService from '../../shared/services/api/invoice';
import { push } from 'react-router-redux';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Dragger = Upload.Dragger;
const FormItem = Form.Item;
const Option = Select.Option;

const certificates = [
    1122832412,
    2121962827,
    15696877,
    86386002,
    10026192003,
    10026192018,
    10026192013,
    10026192008,
    2508941231,
    14129818
];

const invoiceLine = {
    carats: '',
    eurForCarats: 0,
    description: '',
    totalEur: 0,
    everledgerId: ''
};

const accounts = [
    {
        id: 'auth0-5aeccc1e9208b8058a4aa598',
        name: 'Abeco'
    },
    {
        id: 'auth0-5aeccc1e9208b8058a4aa599',
        name: 'Belgium Crown Diamonds'
    }
];

const dueDates = [
    {
        id: '30',
        value: '30 days'
    },
    {
        id: '60',
        value: '60 days'
    },
    {
        id: '90',
        value: '90 days'
    }
];

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
    }
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 6
        }
    }
};

const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    defaultFileList: []
};

const dateFormat = 'YYYY/MM/DD';

class Create extends React.Component {
    state = {
        buyer: '',
        seller: '',
        insurance: '',
        bank: '',
        countryOfOrigin: '',
        exchangeRate: '',
        otherExpenses: '',
        dateOfSale: '',
        dueDate: '30',
        shipper: '',
        value: 0,
        invoiceLines: [
            {
                carats: '',
                eurForCarats: 0,
                description: '',
                totalEur: 0,
                everledgerId: ''
            }
        ]
    };

    handleSubmit() {
        const invoice = this.state;
        invoice.invoiceLines.map(e => {
            e['everledgerId'] =
                certificates[Math.floor(Math.random() * certificates.length)];
        });

        InvoiceService.createInvoice(invoice).then(() => {
            this.props.push('/');
        });
    }

    updateInvoiceLine(item, i, key, value) {
        const { invoiceLines } = this.state;
        invoiceLines[i][key] = value;
        this.setState({ invoiceLines });
    }

    addInvoiceLine() {
        const { invoiceLines } = this.state;
        invoiceLines.push(invoiceLine);
        this.setState({ invoiceLines });
    }

    render() {
        return (
            <Card
                title="Create invoice"
                style={{ width: '70%', margin: 'auto', padding: 25 }}>
                <h1 style={{ paddingTop: 50 }} />

                <FormItem label={'Buyer'} {...formItemLayout}>
                    <Select
                        style={{ width: '100%' }}
                        defaultValue=""
                        onChange={e => this.setState({ buyer: e })}>
                        {accounts.map(item => (
                            <Option value={item.id}>{item.name}</Option>
                        ))}
                    </Select>
                </FormItem>

                <FormItem label={'Insurance'} {...formItemLayout}>
                    <Input
                        value={this.state.insurance}
                        onChange={e =>
                            this.setState({ insurance: e.target.value })
                        }
                    />
                </FormItem>

                <FormItem label={'bank'} {...formItemLayout}>
                    <Input
                        style={{ marginBottom: 0 }}
                        value={this.state.bank}
                        onChange={e => this.setState({ bank: e.target.value })}
                    />
                </FormItem>

                <FormItem label={'country of origin'} {...formItemLayout}>
                    <Input
                        style={{ marginBottom: 0 }}
                        value={this.state.countryOfOrigin}
                        onChange={e =>
                            this.setState({ countryOfOrigin: e.target.value })
                        }
                    />
                </FormItem>

                <FormItem label={'exchange rate'} {...formItemLayout}>
                    <Input
                        style={{ marginBottom: 0 }}
                        value={this.state.exchangeRate}
                        onChange={e =>
                            this.setState({ exchangeRate: e.target.value })
                        }
                    />
                </FormItem>

                <FormItem label={'other expenses'} {...formItemLayout}>
                    <Input
                        style={{ marginBottom: 0 }}
                        placeholder=""
                        value={this.state.otherExpenses}
                        onChange={e =>
                            this.setState({ otherExpenses: e.target.value })
                        }
                    />
                </FormItem>

                <FormItem label={'shipper'} {...formItemLayout}>
                    <Input
                        style={{ marginBottom: 0 }}
                        value={this.state.shipper}
                        onChange={e =>
                            this.setState({ shipper: e.target.value })
                        }
                    />
                </FormItem>

                <FormItem label={'date of sale'} {...formItemLayout}>
                    <div style={{ marginBottom: 0 }}>
                        <DatePicker
                            onChange={e =>
                                this.setState({ dateOfSale: e.unix() })
                            }
                        />
                    </div>
                </FormItem>

                <FormItem label={'due date'} {...formItemLayout}>
                    <div style={{ marginBottom: 0 }}>
                        <Select
                            style={{ width: '100%' }}
                            defaultValue="30"
                            onChange={e => this.setState({ dueDate: e })}>
                            {dueDates.map(item => (
                                <Option value={item.id}>{item.value}</Option>
                            ))}
                        </Select>
                    </div>
                </FormItem>

                <FormItem label={'financeable'} {...formItemLayout}>
                    <RadioGroup
                        defaultValue={false}
                        style={{ marginBottom: 0 }}
                        onChange={e =>
                            this.setState({ financeable: e.target.value })
                        }>
                        <RadioButton value={true}>Auction</RadioButton>
                        <RadioButton value={false}>Financed</RadioButton>
                    </RadioGroup>
                </FormItem>

                <Card
                    title="Invoice parcels"
                    bordered={false}
                    style={{ boxShadow: 'unset' }}
                    extra={
                        <a onClick={() => this.addInvoiceLine()}>
                            Add new parcel
                        </a>
                    }>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {this.state.invoiceLines.map((item, i) => {
                            return (
                                <Card
                                    type="inner"
                                    title={'invoice parcel ' + (i + 1)}
                                    style={{
                                        boxShadow: 'unset',
                                        width: '49%',
                                        marginRight: '1%',
                                        marginBottom: 10
                                    }}>
                                    <p
                                        style={{
                                            marginBottom: 5,
                                            marginTop: 10
                                        }}>
                                        carats
                                    </p>
                                    <Input
                                        onChange={e =>
                                            this.updateInvoiceLine(
                                                item,
                                                i,
                                                'carats',
                                                e.target.value
                                            )
                                        }
                                    />
                                    <p
                                        style={{
                                            marginBottom: 5,
                                            marginTop: 10
                                        }}>
                                        USD / carat
                                    </p>
                                    <Input
                                        onChange={e =>
                                            this.updateInvoiceLine(
                                                item,
                                                i,
                                                'eurForCarats',
                                                e.target.value
                                            )
                                        }
                                    />
                                    <p
                                        style={{
                                            marginBottom: 5,
                                            marginTop: 10
                                        }}>
                                        description
                                    </p>
                                    <Input
                                        onChange={e =>
                                            this.updateInvoiceLine(
                                                item,
                                                i,
                                                'description',
                                                e.target.value
                                            )
                                        }
                                    />
                                    <p
                                        style={{
                                            marginBottom: 5,
                                            marginTop: 10
                                        }}>
                                        Total USD
                                    </p>
                                    <Input
                                        onChange={e =>
                                            this.updateInvoiceLine(
                                                item,
                                                i,
                                                'totalEur',
                                                e.target.value
                                            )
                                        }
                                    />
                                </Card>
                            );
                        })}
                    </div>
                </Card>
                <Card
                    title="Add extra documents"
                    bordered={false}
                    style={{ boxShadow: 'unset' }}>
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> upload
                        </Button>
                    </Upload>
                </Card>
                <FormItem {...tailFormItemLayout}>
                    <Button
                        style={{ marginTop: 50 }}
                        onClick={() => this.handleSubmit()}
                        type="primary">
                        Submit
                    </Button>
                </FormItem>
            </Card>
        );
    }
}

export default connect(null, { push: push })(Form.create()(Create));
