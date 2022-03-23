import { Body, Controller, Put, Req } from '@nestjs/common';
import { CalculateService, Operation } from './calculate.service';

@Controller('calculate')
export class CalculateController {
  constructor(private calculateService: CalculateService) {}

  @Put()
  async getCalculations(
    @Req() request: { headers: { operation: Operation } },
    @Body() data: { first: number; second: number },
  ): Promise<number> {
    return this.calculateService.calculations(
      request.headers['operation'],
      data.first,
      data.second,
    );
  }
}
