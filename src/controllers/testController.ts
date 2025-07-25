import { Request, Response, NextFunction } from 'express'

// Create an item (demo)
export const createItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json({
      message: 'created',
    })
  } catch (error) {
    next(error)
  }
}
