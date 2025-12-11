import { Request, Response } from 'express';
import { sendSuccess } from '../../../utils/apiResponse';
import { readFileSync } from 'fs';
import { join } from 'path';

const startTime = Date.now();
const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'));

const checkDependencies = async () => {
    const dbStart = Date.now();
    // Add actual DB check here
    const dbLatency = Date.now() - dbStart;
    
    const cacheStart = Date.now();
    // Add actual cache check here
    const cacheLatency = Date.now() - cacheStart;
    
    return {
        database: { status: "connected", latency_ms: dbLatency },
        cache: { status: "connected", latency_ms: cacheLatency },
        storage: { status: "connected" }
    };
};

export const healthController = async (req: Request, res: Response) => {
    const uptime = (Date.now() - startTime) / 1000;
    const dependencies = await checkDependencies();
    
    const healthData = {
        status: "ok",
        service: packageJson.name || "QRBite",
        timestamp: new Date().toISOString(),
        uptime,
        version: packageJson.version,
        environment: process.env.NODE_ENV || "development",
        dependencies
    };
    return sendSuccess(res, healthData, 'Server is healthy', 200);
}