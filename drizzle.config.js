// export default defineConfig({
//   dialect: "mysql",
//   schema: "./utils/schema.ts",
//   out: "./drizzle",
//   dbCredentials: {
//     host: "localhost",
//     user: "root",
//     database: "attendence", 
//     password: "Soham@123"
//   }
// });
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "mysql",
  schema: "./utils/schema.js",
  dbCredentials: {
    host: "localhost",
    user: "root",
    database: "attendence", 
    password: "Soham@123"
  },
});
