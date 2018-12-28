import express from 'express'
import { CDIPosService } from './CDIPosService'
import { FundService } from './FundService'

export const app = express()

app.get('/', async (req, res) => {

  const cdiPosService = new CDIPosService()
  const cdiPosReturnRates = await cdiPosService.getReturnRates()

  const fundService = new FundService()
  const fundReturnRates = await fundService.getReturnRates()

  res.send([
    ...cdiPosReturnRates,
    ...fundReturnRates,
  ])
})
