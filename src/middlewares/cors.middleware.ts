import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class CorsMiddleware implements NestMiddleware {
   use(req: Request, res: Response, next: NextFunction) {
    const allowedOrigins = [
        'https://websitejhass.netlify.app', // Producción
        'http://localhost:5173'             // Desarrollo local
    ];
    
    const origin = req.headers.origin as string;
    
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
   }
}
