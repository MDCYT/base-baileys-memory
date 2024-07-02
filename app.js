const { createBot, createProvider, createFlow, addKeyword, EVENTS, flowDynamic } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const openai = require('openai')
require('dotenv').config()

const openaiClient = new openai({
    apiKey: process.env.OPENAI_API_KEY
})

async function getResponse(message) {
    const response = await openaiClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'Eres el asistente de ventas de una tienda de ropa, la tienda se llama "Ropa Bonita", y estás hablando con un cliente que tiene una pregunta sobre un producto. Actualmente poseemos stock de 15 zapatillas rojas, 2 zapatillas azules y 10 zapatillas verdes. El precio de las zapatillas rojas es de $50, el de las zapatillas azules es de $60 y el de las zapatillas verdes es de $70. Tu objetivo es responder a las preguntas del cliente, ayuda al cliente a encontrar el producto que busca y a responder cualquier otra pregunta que pueda tener. A su vez de intentar cerrar la venta. El cliente puede hacer preguntas sobre el stock, los precios, los colores y cualquier otra información que pueda necesitar para tomar una decisión de compra.'
            },
            {
                role: 'user',
                content: message
            }
        ]
    })

    return response
}

const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAction({ capture: true }, async (ctx, { flowDynamic }) => {
        const response = await getResponse(ctx.body)
        return await flowDynamic(response.choices[0].message.content)
    })
    .addAction({ capture: true }, async (ctx, { flowDynamic }) => {
        const response = await getResponse(ctx.body)
        return await flowDynamic(response.choices[0].message.content)
    })
    .addAction({ capture: true }, async (ctx, { flowDynamic }) => {
        const response = await getResponse(ctx.body)
        return await flowDynamic(response.choices[0].message.content)
    })
    .addAction({ capture: true }, async (ctx, { flowDynamic }) => {
        const response = await getResponse(ctx.body)
        return await flowDynamic(response.choices[0].message.content)
    })
    .addAction({ capture: true }, async (ctx, { flowDynamic }) => {
        const response = await getResponse(ctx.body)
        return await flowDynamic(response.choices[0].message.content)
    })
    .addAction({ capture: true }, async (ctx, { flowDynamic }) => {
        const response = await getResponse(ctx.body)
        return await flowDynamic(response.choices[0].message.content)
    })
    .addAnswer('Chao!')

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
