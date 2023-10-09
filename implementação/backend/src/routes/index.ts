import  express  from 'express';
import clientRoutes from './student.routes.ts'
import companyRoutes from './company.routes.ts'
import schoolRoutes from './school.routes.ts'

const routes = express()

routes.use('/student', clientRoutes)
routes.use('/company', companyRoutes)
routes.use('/school', schoolRoutes)

export {routes}