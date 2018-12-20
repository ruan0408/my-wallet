import express from 'express'
import {CDIProvider} from './CDIProvider'

export const app = express()

app.get('/', async (req, res) => {
    const cdiProvider = new CDIProvider()
    const bla = await cdiProvider.calc(
        2000,
        124,
        new Date('2018-05-08'),
        new Date('2018-12-14'),
    )
    res.send(bla)
})
