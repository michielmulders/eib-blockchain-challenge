import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CpDto {
    @IsString()
    @ApiModelProperty()
    readonly key: string;
    @IsString()
    @ApiModelProperty()
    readonly issuer: string;
    @IsString()
    @ApiModelProperty()
    readonly guarantor: string;
    @IsString()
    @ApiModelProperty()
    readonly type: string;
    @IsString()
    @ApiModelProperty()
    readonly dealer: string;
    @IsString()
    @ApiModelProperty()
    readonly issueDate: string;
    @IsString()
    @ApiModelProperty()
    readonly maturityDate: string;
    @IsString()
    @ApiModelProperty()
    readonly discount: string;
    @IsString()
    @ApiModelProperty()
    readonly delivery: string;
    @IsString()
    @ApiModelProperty()
    readonly amount: string;
    @IsString()
    @ApiModelProperty()
    readonly rating: string;
    @IsString()
    @ApiModelProperty()
    readonly buyerId: string;
    @IsString()
    @ApiModelProperty()
    readonly status: string;
    @IsString()
    @ApiModelProperty()
    readonly isin: string;
}
