import React from 'react';

export default ({ cp }) => (
    <div
        style={{
            width: '100%',
            marginBottom: 35,
            paddingBottom: 25,
            display: 'flex', borderBottom: '1px solid #ccc'
        }}>
        <div style={{ display: 'flex', marginRight: 25 }}>
            <img
                src="../pay.png"
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
                        fontFamily: 'lato',
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
                    textAlign: 'right',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                <div style={{
                    textAlign: 'right'
                }}>
                    <span>Guarantor</span>
                    <h5 style={{ fontSize: '1.5em' }}>
                        {cp.issuer}
                    </h5>
                </div>
                <div style={{
                    textAlign: 'right',
                    marginLeft: 30,
                    paddingLeft: 30,
                    borderLeft: '1px solid #eee'
                }}>
                    <span>Issuer</span>
                    <h5 style={{ fontSize: '1.5em' }}>
                        {cp.guarantor}
                    </h5>
                </div>
            </div>
        </div>
    </div>
);


