import moment from 'moment'
import * as momentbd from 'moment-business-days'

momentbd.updateLocale('pt-BR', {
  holidays: [
    '01/01',
    '21/04',
    '01/05',
    '07/09',
    '12/10',
    '02/11',
    '15/11',
    '25/12',
   ],
  holidayFormat: 'DD/MM',
})

const BUSSINESS_DAYS_PER_YEAR = 252

export class RateConverterService {

  annualize(periodRate: number, startDate: Date, endDate: Date) {
    const periodInDays = moment(startDate).businessDiff(moment(endDate))
    const dayRate = Math.pow(periodRate + 1, 1 / periodInDays) - 1

    return Math.pow((dayRate + 1), BUSSINESS_DAYS_PER_YEAR) - 1
  }
}
