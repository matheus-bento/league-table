import {Request} from 'express';

export interface RequestWithBody<B> extends Request {
  body: B
}

export interface RequestWithBodyAndParams<
    P extends {[key: string]: string}, B> extends Request {
  body: B
  params: P
}
