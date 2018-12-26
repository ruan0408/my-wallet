import express from 'express'
import moment from 'moment'
import * as momentbd from 'moment-business-days'
import {CDIProvider} from './CDIProvider'

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

export const app = express()

const investments = [
  {
    value: 2000,
    cdiRate: 124,
    startDate: moment('2018-05-08').toDate(),
  },
]

function bussinessDaysInInterval(start: Date, end: Date) {
  return moment(start).businessDiff(moment(end))
}

app.get('/', async (req, res) => {
    const cdiProvider = new CDIProvider()
    const returns = []

    for (const investment of investments) {
      const startDate = investment.startDate
      const endDate = moment().toDate()
      const data = await cdiProvider.calc(
        investment.value,
        investment.cdiRate,
        investment.startDate,
        endDate,
      )
      const periodRateInPercentage = parseFloat(data.taxa)
      const periodRate = periodRateInPercentage / 100 + 1
      const periodInDays = bussinessDaysInInterval(startDate, endDate)
      const dayRate = Math.pow(periodRate, 1 / periodInDays) - 1

      const yearRate = Math.pow((1 + dayRate), BUSSINESS_DAYS_PER_YEAR) - 1
      returns.push(yearRate * 100)
    }
    res.send(returns)
})
