import { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'
import * as admin from 'firebase-admin'

const serviceAccount = require('../../permissions.json')

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const endpoinSecret = process.env.STRIPE_SIGNING_SECRET

const fulfillOrder = async (session: any) => {
  console.log('fulfilling order', session)

  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() =>
      console.log(`SUCCESS ORDER: ${session.id} has been added to the DB`)
    )
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req)
    const payload = requestBuffer.toString()
    const sig = req.headers['stripe-signature']

    let event

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpoinSecret)
    } catch (err: any) {
      return res.status(400).send(`Webhook construct error: ${err.message}`)
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object

      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) =>
          res.status(400).send(`Webhook fulfill error ${err.message}`)
        )
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}
