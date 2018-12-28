import moment from 'moment'
import { FundProvider } from './FundProvider'
import { RateConverterService } from './RateConverterService'

const investments = [
  {
    type: 'fund',
    cnpj: '26.673.556/0001-32',
    value: 1100,
    startDate: moment('2018-11-16').toDate(),
  },
]

export class FundService {
  private fundProvider = new FundProvider()
  private rateConverterService = new RateConverterService()

  async getReturnRates(): Promise<any[]> {
    const returnRates = []
    for (const investment of investments) {
      const endDate = moment('2018-12-21').toDate()
      const rawReturnRate = await this.fundProvider.getRawReturnRate(
        investment.cnpj,
        investment.startDate,
        endDate,
      )

      const annualizedRate = this.rateConverterService.annualize(
        rawReturnRate,
        investment.startDate,
        endDate,
      )

      returnRates.push({
        ...investment,
        annualizedRate: annualizedRate * 100,
      })
    }
    return returnRates
  }
}
