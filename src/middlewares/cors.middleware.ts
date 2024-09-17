import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class CorsMiddleware implements NestMiddleware {
    use (req: Request, res: Response, next: NextFunction) {
        // Configura los orígenes permitidos según el entorno
        const allowedOrigins = ['http://localhost:5173', 'https://eclectic-malabi-5700c0.netlify.app'];

        // Verifica si el origen de la solicitud está en la lista de orígenes permitidos
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin as string)) {
            res.header('Access-Control-Allow-Origin', origin);
        } else {
            res.header('Access-Control-Allow-Origin', '*'); // Para permitir cualquier origen en caso de no coincidir
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
