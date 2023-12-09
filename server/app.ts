import express, { Application, NextFunction } from 'express';
import serverConfig from './configs/server';
import expressConfig from './configs/express_configs';
import databaseConfig from './configs/database_config';
import routes from './routes/routes';
import { errorHandlingMiddleware } from './middlewares/errorHandler';
import AppError from './utils/AppError';


const app:Application = express();

//start the database connection
databaseConfig();
  
// calling express configuration
expressConfig(app); 

//starting the server
serverConfig(app);

//routes
routes(app);

//eror handling middleware
app.use(errorHandlingMiddleware)

 
app.all('*', (req,res,next:NextFunction) => {
    next(new AppError('Not found', 404));
});