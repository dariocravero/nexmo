let { json, send } = require('micro')
let fetch = require('node-fetch')

let NEXTMO_API = 'https://rest.nexmo.com/sms/json'

module.exports = async (req, res) => {
  console.log(req.url, req.method)
  if (req.method !== 'POST') return send(res, 404)

  try {
    let data = await json(req)
    switch (req.url) {
      case '/sendSms':
        return await sendSms(data)
      // case '/receiveSms':
      //   return await receiveSms(data)
      default:
        return send(res, 404)
    }
  } catch (error) {
    return send(res, 500, error)
  }
}

async function sendSms({ to, from, text }) {
  let res = await fetch(NEXTMO_API, {
    method: 'POST',
    body: JSON.stringify({
      api_key: process.env.apiKey,
      api_secret: process.env.apiSecret,
      to,
      from,
      text,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  let data = await res.json()

  let hasError = data.messages.some(msg => msg.status !== '0')
  if (hasError) throw data

  return data
}

// async function receiveSms(data) {
//   return 'received'
// }
