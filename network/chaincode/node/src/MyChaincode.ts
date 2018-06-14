import { Chaincode, ChaincodeError, Helpers, StubHelper } from '@theledger/fabric-chaincode-utils';
import * as Yup from 'yup';
const uuid = require('uuid/v4');

export class MyChaincode extends Chaincode {

    async queryCP(stubHelper: StubHelper, args: string[]): Promise<any> {
        
        const verifiedArgs = await Helpers.checkArgs<{ key: string }>(args, Yup.object()
            .shape({
                key: Yup.string().required(),
            }));

        const cp = stubHelper.getStateAsObject(verifiedArgs.key); //get the cp from chaincode state

        if (!cp) {
            throw new ChaincodeError('Commercial Paper does not exist');
        }

        return cp;
    }

    async initLedger(stubHelper: StubHelper, args: string[]) {

        let cps = [{
            issuer: 'auth0-5aeccc1e9208b8058a4aa598',
            guarantor: 'EIB Bank',
            type: 'Commercial Paper',
            dealer: 'auth0-1aeccc1e9208b8058a4aa510',
            issueDate: '15-06-2018',
            maturityDate: '15-09-2018',
            discount: '0.85%',
            delivery: 'Against Payment',
            amount: '$250,000,000',
            rating: 'X+',
            buyerId: '',
            status: 'OPEN',
            isin: '0',
        }];

        /* for (let i = 0; i < cps.length; i++) {
            const cp: any = cps[i];

            cp.docType = 'cp';
            await stubHelper.putState(uuid(), cp);
            this.logger.info('Added <--> ', cp);
        } */

        for(let cp of cps as Array<any>) {
            cp.docType = 'cp';
            await stubHelper.putState(uuid(), cp);
            this.logger.info('Added <--> ', cp);
        }

    }

    async createCP(stubHelper: StubHelper, args: string[]) {
        const verifiedArgs = await Helpers.checkArgs<any>(args, Yup.object()
            .shape({
                issuer: Yup.string().required(),
                guarantor: Yup.string().required(),
                dealer: Yup.string().required(),
                issueDate: Yup.string().required(),
                maturityDate: Yup.string().required(),
                discount: Yup.string().required(),
                amount: Yup.string().required(),
                rating: Yup.string().required(),
            }));

        let cp = {
            key: uuid(),
            docType: 'cp',
            issuer: verifiedArgs.issuer,
            guarantor: verifiedArgs.guarantor,
            type: 'Commercial Paper',
            dealer: verifiedArgs.dealer,
            issueDate: verifiedArgs.issueDate,
            maturityDate: verifiedArgs.maturityDate,
            discount: verifiedArgs.discount,
            delivery: 'Against Payment',
            amount: verifiedArgs.amount,
            rating: verifiedArgs.rating,
            buyerId: '',
            status: 'open',
            isin: '0',
        };

        await stubHelper.putState(cp.key, cp);
    }

    async queryAllCPs(stubHelper: StubHelper, args: string[]): Promise<any> {

        return await stubHelper.getQueryResultAsList({
            selector: {
                docType: 'cp'
            }
        });

    }

    async queryAllOpenCPs(stubHelper: StubHelper, args: string[]): Promise<any> {
        
                return await stubHelper.getQueryResultAsList({
                    selector: {
                        docType: 'cp',
                        isin: '0'
                    }
                });
        
            }

    /* async changeCarOwner(stubHelper: StubHelper, args: string[]) {

        const verifiedArgs = await Helpers.checkArgs<{ key: string; owner: string }>(args, Yup.object()
            .shape({
                key: Yup.string().required(),
                owner: Yup.string().required(),
            }));

        let car = await <any>stubHelper.getStateAsObject(verifiedArgs.key);

        car.owner = verifiedArgs.owner;

        await stubHelper.putState(verifiedArgs.key, car);
    } */
}