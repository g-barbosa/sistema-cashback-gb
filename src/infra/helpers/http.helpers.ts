import { BaseResponse } from '../../domain/DTO/base.response'
import { Request } from 'express'

export const badRequest = (error: Error): BaseResponse => ({
  statusCode: 400,
  body: error.message
})

export const ok = (data: any): BaseResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): BaseResponse => ({
  statusCode: 200,
  body: data
})

export const unauthorized = (error: Error): BaseResponse => ({
  statusCode: 401,
  body: error.message
})

export const notfound = (error: Error): BaseResponse => ({
  statusCode: 404,
  body: error.message
})

export interface RequestHelper extends Request {
  cpf?: string;
  email?: string;
  revendedorId?: string;
}