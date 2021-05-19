const routes = require('next-routes')


module.exports = routes()
  .add("index", "/")
  .add("login", "/login")
  .add("signup", "/signup")
  .add("forgotpassword", "/forgotpassword")
  .add("resetpassword", "/resetpassword")
  .add("mailverification", "/mailverification")
  .add("mailverificationsent", "/mailverificationsent")
  .add("createEvent", "/createEvent")
  // .add("dashboard", "/dashboard/in")
  // .add("/dashboard/dgda", "/dashboard/dgda")
  // .add("/dashboard/dgi", "/dashboard/dgi")
  // .add("/dashboard/dgrad", "/dashboard/dgrad")
  // .add("/dashboard/dgrk", "/dashboard/dgrk")
  // .add("/dashboard/reports", "/dashboard/report")
  // .add("AdminLogin", "/admin/login")
  // .add("AdminDGRAD", "/admin/dgrad")
  // .add("AdminDGDA", "/admin/dgda")
  // .add("AdminDGRK", "/admin/dgrk")
  // .add("AdminDGI", "/admin/dgi");
