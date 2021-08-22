import { Response } from 'express';
import { RequestHelper } from '../helpers/http.helpers';

const jwt = require('jsonwebtoken')

export default (request: RequestHelper, response: Response, next: any) => {
  const header = request.headers.authorization

  if (!header) return response.status(401).json({ message: 'Token não informado' })

  const token = header.split(' ')[1];

  jwt.verify(token, process.env.APP_AUTH_SECRET, (err: any, decoded: any) => {
    if (err) return response.status(401).json({ message: 'Token inválido' })

    request.revendedorId = decoded.id;
    request.cpf = decoded.cpf;
    request.email = decoded.email;
    return next()
  })
}