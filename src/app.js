const express = require('express')
const axios = require('axios')

const app = express()

app.get('/', async (req, res, next) => {
    res.send('bla')
    const response = await cdiData()
    console.log('response', response)
})


async function cdiData() {
    return axios({
        method:'get',
        url:'https://api.calculadorarendafixa.com.br/di/calculo?dataInicio=2018-05-08&dataFim=2018-12-14&percentual=124&valor=2000',
        headers: {
            'Authorization': 'ruan0408ab216a06573547c2e5bb01a5ccad62868a8ffc4a96a57abe00d2a24b92dde5dd39ac222b41f560a5b70d7'
        }
      }).then(res => res.data)
}

module.exports = app