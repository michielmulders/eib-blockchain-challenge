import React from 'react';
import { Button } from 'antd';

export default ({ handleClick }) => (
    <div className="pricing--container">
        <div className="pricing-container-title">Summary</div>
        <div className="pricing--container-items-wrap">
        <div className="pricing--container-item"><div className="pricing--label">Amount</div> <div className="pricing--value">$ 25,000,000</div></div>
        <div className="pricing--container-item"><div className="pricing--label">Discount</div> <div className="pricing--value pricing-discount">+ 0,85%</div></div>
        <div className="pricing--container-item" style={{ borderBottom: "none" }}><div className="pricing--label">Total</div> <div className="pricing--value">$ 25,212,500</div></div>
        </div>
        <div className="date--container-button">

            <Button onClick={handleClick} type="primary">ACCEPT</Button>
        </div>
    </div>
);


