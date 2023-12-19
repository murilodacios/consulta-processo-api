import axios from "axios";
import { FastifyInstance } from "fastify";
import { z } from 'zod'

import xml2js from "xml2js";


export async function consultaProcesso(app: FastifyInstance) {

    app.post('/consultar', async (req, res) => {

        const bodySchema = z.object({
            processo: z.string()
        })

        const {
            processo
        } = bodySchema.parse(req.body)


        let xml =
            `
        <soapenv:Envelope
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xsd="http://www.w3.org/2001/XMLSchema"
        xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:sei="Sei">
        <soapenv:Header/>
        <soapenv:Body>
          <sei:consultarProcedimento soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
            <SiglaSistema xsi:type="xsd:string">APISEI</SiglaSistema>
            <IdentificacaoServico xsi:type="xsd:string">consultaProcedimento</IdentificacaoServico>
            <ProtocoloProcedimento>${processo}</ProtocoloProcedimento>
            <SinRetornarUltimoAndamento>S</SinRetornarUltimoAndamento>
            <SinRetornarAndamentoConclusao>S</SinRetornarAndamentoConclusao>
            <SinRetornarUnidadesProcedimentoAberto>S</SinRetornarUnidadesProcedimentoAberto>
          </sei:consultarProcedimento>
        </soapenv:Body>
      </soapenv:Envelope>
    `

        const api = axios.create({
            baseURL: "https://sei.ib.itaborai.rj.gov.br/sei/ws/SeiWS.php",
            headers: {
                'Content-Type': 'text/xml;charset=utf-8',
                'Accept-Encoding': 'gzip,deflate',
                'Content-Length': xml.length,
            }
        })


        const resultado = await api.post("/", xml)

        return resultado.data

    })

}