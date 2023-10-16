import express from "express";
import clientRoutes from "./student.routes.ts";
import companyRoutes from "./company.routes.ts";
import adminRoutes from "./admin.routes.ts";
import teacherRoutes from "./teacher.routes.ts";

const routes = express();

routes.use("/student", clientRoutes);
routes.use("/company", companyRoutes);
routes.use("/teacher", teacherRoutes);
routes.use("/admin", adminRoutes);

export { routes };
