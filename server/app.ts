import express, { Application } from 'express';

import serverConfig from './configs/server';
import expressConfig from './configs/express_configs';
import databaseConfig from './configs/database_config';
import routes from './routes/routes';



const app:Application = express();



// calling express configuration
expressConfig(app); 

//routes
routes(app);

//start the database connection

databaseConfig();
  
//starting the server
serverConfig(app);


