import { Body, Controller, Get, Inject, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { CpService } from './cp.service';
import { CpDto } from './cp.model';
import { InvokeResult } from '../invokeresult.model';
import { ApiOAuth2Auth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { IAuthService } from '../../services/authentication/authenticationservice.interface';

@ApiUseTags('cps')
@Controller('cps')
export class CpController {

    /**
     * Creates an instance of CpController.
     * @memberof CpController
     * @param {CpService} cpService
     * @param authService
     */
    constructor(
        @Inject('IAuthService') private authService: IAuthService, // For some reason, we can't remove this line even tho it is not used
        private cpService: CpService) {
    }

    /**
     * Get all cps
     *
     * @returns {Promise<CpDto[]>}
     * @memberof CpController
     */
    @Get()
    @ApiOperation({title: 'Get all cps'})
    @ApiOAuth2Auth(['read'])
    @ApiResponse({
        status: 200,
        description: 'Returns a list of Cp objects',
        type: CpDto,
        isArray: true
    })
    getAll(): Promise<CpDto[]> {
        return this.cpService.getAll();
    }

    /**
     * Get all open cps
     *
     * @returns {Promise<CpDto[]>}
     * @memberof CpController
     */
    @Get('open')
    @ApiOperation({title: 'Get all open cps'})
    @ApiOAuth2Auth(['read'])
    @ApiResponse({
        status: 200,
        description: 'Returns a list of open Cp objects',
        type: CpDto,
        isArray: true
    })
    getAllOpen(): Promise<CpDto[]> {
        return this.cpService.getAllOpen();
    }

    // /**
    //  * Get Cp by id
    //  *
    //  * @returns {Promise<CpDto[]>}
    //  * @memberof CpController
    //  * @param id
    //  */
    // @Get(':id')
    // @ApiOperation({title: 'Get a Cp by id'})
    // @ApiOAuth2Auth(['read'])
    // @ApiResponse({
    //     status: 200,
    //     description: 'Returns a Cp object',
    //     type: CpDto,
    // })
    // @ApiResponse({
    //     status: 404,
    //     description: 'Cp does not exist!',
    //     type: NotFoundException
    // })
    // getById(@Param('id') id: string): Promise<CpDto> {
    //     return this.cpService.getById(id);
    // }

    // /**
    //  * Create new Cp
    //  *
    //  * @param {CpDto} cpDto
    //  * @param req
    //  * @returns {*}
    //  * @memberof CpController
    //  */
    // @Post()
    // @ApiOperation({title: 'Create new Cp'})
    // @ApiResponse({
    //     status: 201,
    //     description: 'The record has been successfully created.',
    // })
    // @ApiOAuth2Auth(['write'])
    // create(@Body() cpDto: CpDto, @Req() req): Promise<InvokeResult> {
    //     return this.cpService.create(cpDto, req.auth);
    // }

}