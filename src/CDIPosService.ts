import moment from 'moment'
import { CDIProvider } from './CDIProvider'
import { RateConverterService } from './RateConverterService'

const investments = [
  {
    type: 'cdi-pos',
    value: 2000,
    cdiRate: 124,
    startDate: moment('2018-05-08').toDate(),
  },
]

export class CDIPosService {
  private cdiProvider = new CDIProvider()
  private rateConverterService = new RateConverterService()

  async getReturnRates(): Promise<any[]> {
    const returnRates = []

    for (const investment of investments) {
      const startDate = investment.startDate
      const endDate = moment().toDate()
      const periodRate = await this.cdiProvider.getRawReturnRate(
        investment.value,
        investment.cdiRate,
        investment.startDate,
        endDate,
      )

      const annualizedRate = this.rateConverterService.annualize(
        periodRate,
        startDate,
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
