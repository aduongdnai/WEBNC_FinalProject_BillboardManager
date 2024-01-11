import express from 'express';
import { processLogFiles } from '../utils/LoadLoggingFile.js';
const router = express.Router();


router.get('/', async (req, res) => {
    const logs = await processLogFiles('./logs')
    res.json( logs );
});

export default router;
