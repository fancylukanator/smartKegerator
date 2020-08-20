const {  authJwt  } = require("../middlewares");
const controller = require("../controllers/user.controller");
const sensorcontroller = require("../controllers/sensor.controller");
const tapcontroller = require("../controllers/tap.controller");
const logcontroller = require("../controllers/log.controller");
const statscontroller = require("../controllers/stats.controller");

module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  // logs

  app.get("/api/test/all/logs/", logcontroller.findAll);

  app.get("/api/test/all/logs/:id", logcontroller.findOne);

  // stats / users

  app.get("/api/test/all/stats/", statscontroller.findAll);

  app.get("/api/test/all/stats/:id", statscontroller.findOne);

  app.put("/api/test/admin/stats/:id", tapcontroller.update);

  app.delete("/api/test/admin/stats/:id", tapcontroller.delete);


  // taps

  app.post("/api/test/admin/taps/", tapcontroller.create);

  app.get("/api/test/admin/taps/", tapcontroller.findAll);

  app.get("/api/test/admin/taps/inUse", tapcontroller.findAllinUse);

  app.get("/api/test/all/left", tapcontroller.findLeft);

  app.get("/api/test/all/right", tapcontroller.findRight);

  app.get("/api/test/admin/taps/:id", tapcontroller.findOne);

  app.put("/api/test/admin/taps/:id", tapcontroller.update);

  app.delete("/api/test/admin/taps/:id", tapcontroller.delete);

  app.delete("/api/test/admin/taps/", tapcontroller.deleteAll);

  //app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get("/api/test/user", authJwt.verifyToken, sensorcontroller.serialSensorData);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  
};