import { NextApiRequest, NextApiResponse } from 'next'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { items, email } = req.body

  const transformedItems = items.map((item: any) => ({
    quantity: 1,
    price_data: {
      currency: 'eur',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
        description: item.description,
      },
    },
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: transformedItems,
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: ['GB', 'US', 'CA', 'LT'],
    },
    shipping_options: [{ shipping_rate: 'shr_1MhAwuBIInsWApot1dtV81pk' }],
    currency: 'eur',
    metadata: {
      email,
      images: JSON.stringify(items.map((item: any) => item.image)),
    },
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/cart`,
  })

  res.status(200).json({ id: session.id })
}
