import React from 'react';
import { Tag } from 'antd';


export default ({ cp }) => (
    <div
        style={{
            width: '100%',
            marginBottom: 25,
            display: 'flex'
        }}>
        <div style={{ display: 'flex', marginRight: 25 }}>
            <img
                src="../approve.png"
                style={{
                    width: 40,
                    height: 40,
                    marginTop: 8
                }}
            />
        </div>
        <div
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start'
            }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <h1
                    style={{
                        margin: 0,
                        padding: 0,
                        fontSize: '1.7em',
                        fontWeight: 700
                    }}>
                    Commercial Paper
                </h1>
                <h4
                    style={{
                        margin: 0,
                        padding: 0,
                        color: '#888'
                    }}>
                    U.S.-Commercial Paper Program
                </h4>
            </div>
            <div
                style={{
                    marginLeft: 'auto',
                    textAlign: 'right'
                }}>
                <span>Price</span>
                <h5 style={{ fontSize: '1.5em' }}>
                    $ 25,000,000
                </h5>
            </div>
        </div>
    </div>
);


