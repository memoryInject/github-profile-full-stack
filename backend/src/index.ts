import * as dotenv from 'dotenv';

import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;
const message = `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`;

app().listen(PORT, () => console.log(message));
