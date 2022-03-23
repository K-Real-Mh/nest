import { Injectable } from '@nestjs/common';

export type Operation =
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division';

@Injectable()
export class CalculateService {
  private readonly addition = (first: number, second: number): number => {
    return first + second;
  };
  private readonly subtraction = (first: number, second: number): number => {
    return first - second;
  };
  private readonly multiplication = (first: number, second: number): number => {
    return first * second;
  };
  private readonly division = (first: number, second: number): number => {
    return first / second;
  };

  calculations(operation: Operation, first: number, second: number): number {
    return this[operation](first, second);
  }
}
