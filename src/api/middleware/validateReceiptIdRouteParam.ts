import { Request, Response, NextFunction } from "express";
import { validate as isUUID } from "uuid";

export const validateReceiptIdRouteParam =
    (req: Request, res: Response, next: NextFunction): void => {
        const { id } = req.params;
        if (!isUUID(id)) {
            res.status(404)
            res.json({ error: "The receipt is invalid." });
            return;
        }
        next();
    };

