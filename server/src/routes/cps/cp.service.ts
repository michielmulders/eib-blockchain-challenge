import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ChainMethod } from '../chainmethods.enum';
import { CpDto } from './cp.model';
import { InvokeResult } from '../invokeresult.model';
import { RequestHelper } from '../../services/chain/requesthelper';
import { IAuthUser } from '../../services/authentication/authenticateduser';

@Injectable()
export class CpService {
    /**
     * Creates an instance of CpService.
     * @param {RequestHelper} requestHelper
     * @memberof CpService
     */
    constructor(private requestHelper: RequestHelper) {
    }

    /**
     * Get all cps
     *
     * @returns {Promise<CpDto[]>}
     * @memberof CpService
     */
    getAll(): Promise<CpDto[]> {
        return this.requestHelper.queryRequest(ChainMethod.queryAllCPs).catch((error) => {
            throw new InternalServerErrorException(error);
        });
    }

    /**
     * Get all open cps
     *
     * @returns {Promise<CpDto[]>}
     * @memberof CpService
     */
    getAllOpen(): Promise<CpDto[]> {
        return this.requestHelper.queryRequest(ChainMethod.queryAllOpenCPs).catch((error) => {
            throw new InternalServerErrorException(error);
        });
    }

    /**
     * Get all open cps
     *
     * @returns {Promise<CpDto[]>}
     * @memberof CpService
     */
    buyCp(authId): Promise<CpDto>{
        return this.requestHelper.queryRequest(ChainMethod.queryAllOpenCPs, {authId}).catch((error) => {
            throw new InternalServerErrorException(error);
        });
    }

    // /**
    //  * Get cp by id
    //  *
    //  * @returns {Promise<CpDto>}
    //  * @memberof CpService
    //  */
    // getById(id: string): Promise<CpDto> {
    //     return this.requestHelper.queryRequest(ChainMethod.queryCp, {key: id}, {
    //         'encrypt-key': Buffer.from('01234567890123456789012345678901'),
    //         'iv': Buffer.from('0123456789012345')
    //     }).then(
    //         (cp) => {
    //             if (!cp) {
    //                 throw new NotFoundException('Cp does not exist!');
    //             }
    //             return cp;
    //         },
    //         (error) => {
    //             throw new InternalServerErrorException(error);
    //         },
    //     );
    // }

    // /**
    //  * Create new cp
    //  *
    //  * @param {CpDto} cpDto
    //  * @param {IAuthUser} authUser
    //  * @returns {Promise<InvokeResult>}
    //  * @memberof CpService
    //  */
    // create(cpDto: CpDto, authUser: IAuthUser): Promise<InvokeResult> {
    //     return this.requestHelper.invokeRequest(ChainMethod.createCp, cpDto, authUser.id, false, {
    //         'encrypt-key': Buffer.from('01234567890123456789012345678901'),
    //         'iv': Buffer.from('0123456789012345')
    //     })
    //         .catch((error) => {
    //             throw new InternalServerErrorException(error);
    //         });
    // }
}
