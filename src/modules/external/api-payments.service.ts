import { getConfig } from '../../common/config';
import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

const config = getConfig();

@Injectable()
export class ApiPaymentsService {
  private readonly paymentProcessorUrl = `http://${config.get('externalServices.payments.host')}:${config.get('externalServices.payments.port')}${config.get('externalServices.payments.baseUrl')}`;

  constructor(private httpService: HttpService) {}

  async processOrder(data: any) {
    const params = JSON.stringify(data);
    return this.httpService.post(
      `${this.paymentProcessorUrl}/payments`,
      params,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }).pipe(map((res) => {
        return res.data;
    })).toPromise();
  }
}
