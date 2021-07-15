import { SiteClient } from 'datocms-client'

export default async function recebedorDeRequests(request, response) {
    if (request.method === 'POST') {
        const TOKEN = 'e8d7982391773b9b910a53ca1858cf'
        const client = new SiteClient(TOKEN)

        const registroCriado = await client.items.create({
            itemType: "966766", // ID do Model de comunidades criado pelo Dato
            ...request.body,
            // title: 'Comunidade de teste',
            // imageUrl: "https://github.com/dticed.png",
            // creatorSlug: 'dticed'
        })

        response.json({
            registerCreated: registroCriado,
        })
        return
    }

    response.status(404).json({
        message: "Ainda não temos nada no GET, mas no POST tem!"
    })
}