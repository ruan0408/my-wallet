import axios from 'axios'
import moment from 'moment'

const authHeader = 'ruan0408ab216a06573547c2e5bb01a5ccad62868a8ffc4a96a57abe00d2a24b92dde5dd39ac222b41f560a5b70d7'

export class CDIProvider {
  private provider = axios.create({
    baseURL: 'https://api.calculadorarendafixa.com.br/di',
    headers: {
      'Authorization': authHeader,
    },
  })

  async calc(value: number, cdiPercent: number, start: Date, end: Date) {
    const startDay = moment(start).format('YYYY-MM-DD')
    const endDay = moment(end).format('YYYY-MM-DD')
    return this.provider.get('/calculo', {
      params: {
        valor: value,
        percentual: cdiPercent,
        dataInicio: startDay,
        dataFim: endDay,
      },
    })
    .then(res => res.data)
    .catch(e => console.log(e))
  }
}
