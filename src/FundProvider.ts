import cheerio from 'cheerio'
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'

export class FundProvider {

  // TODO handle non-existent dates
  async getRawReturnRate(cnpj: string, start: Date, end: Date) {
    const data = await axios.get(
      'https://magnetis.com.br/fund_shares/autocomplete',
      {
        params: {
          search: cnpj,
        },
      },
    ).then(res => res.data)

    const slug = data[0].slug

    const html = await axios.get(
      `https://magnetis.com.br/fundos-de-investimento/${slug}`,
    ).then(res => res.data)

    const $ = cheerio.load(html)

    const seriesArray = JSON.parse($('#fund-return-chart').attr('data-series'))

    const series = seriesArray
      .reduce((acc: _.Dictionary<number>, array: number[][]) => ({
        ...acc,
        [moment.utc(array[0]).format('YYYY-MM-DD')]: array[1],
      }),
    )

    const startValue = series[moment(start).format('YYYY-MM-DD')]
    const endValue = series[moment(end).format('YYYY-MM-DD')]

    return endValue / startValue - 1
  }
}
