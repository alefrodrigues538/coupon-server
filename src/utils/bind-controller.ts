// src/utils/bind-controller.ts
import { NextFunction, Request, Response } from 'express';

type Handler = (req: Request, res: Response, next?: NextFunction) => any;

export function bindController<T extends object>(controller: T): T {
  const bound: Partial<T> = {};
  for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(controller))) {
    const val = (controller as any)[key];
    if (key !== 'constructor' && typeof val === 'function') {
      bound[key as keyof T] = val.bind(controller);
    }
  }
  return bound as T;
}
