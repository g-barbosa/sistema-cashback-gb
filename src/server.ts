import express from 'express'
import cors from 'cors'
import bodyParser  from 'body-parser'
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './configs/swagger/swagger_output.json'
import dotenv from 'dotenv'

dotenv.config();

import { routes } from './routes/routes'

const app = express()
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(process.env.PORT || 3000)

export default app