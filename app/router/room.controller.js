var roomService = require("../service/room.service")();
var logger = require("../util/logger").getLogger("roomController");

module.exports = function () {
    var me = {};

    function responseJson(res, obj) {
        logger.info("response json= %j", obj);
        res.json(obj);
    }

    //room
    me.addRoom = function (req, res) {
        if (!req.query || !req.query.name) {
            responseJson(res, {success: false, message: "name required."});
            return;
        }
        var room = {name: req.query.name, address: req.query.address, description: req.query.description};

        roomService.addRoom(room, function (err, newRoom) {
            if (err || !newRoom) {
                logger.info('add room failed,error=', err);
                responseJson(res, {success: false});
            } else {
                responseJson(res, {success: true, room: newRoom});
            }
        });
    };

    me.updateRoom = function (req, res) {
        if (!req.query || !req.query.id) {
            responseJson(res, {success: false, message: "id required."});
            return;
        }

        var room = {};
        if (req.query.name) room.name = req.query.name;
        if (req.query.address) room.address = req.query.address;
        if (req.query.description) room.description = req.query.description;
        if (req.query.status) room.status = req.query.status;

        roomService.updateRoom(req.query.id, room, function (err, count) {
            if (err || !count) {
                if (err) logger.info("update room err,", err);
                responseJson(res, {success: false});
            } else {
                responseJson(res, {success: count > 0, count: count});
            }
        });
    };

    me.deleteRoom = function (req, res) {
        if (!req.query || !req.query.id) {
            responseJson(res, {success: false, message: "id required."});
            return;
        }
        roomService.deleteRoom(req.query.id, function (err, count) {
            if (err) {
                if (err) logger.info("delete room err,", err);
                responseJson(res, {success: false});
            } else {
                responseJson(res, {success: count > 0, count: count});
            }
        });
    };

    me.allActiveRooms = function (req, res) {
        roomService.allActiveRooms(function (err, rows) {
            if (err || !rows || rows.length == 0) {
                logger.info("all room empty", err);
                responseJson(res, {rooms: []});
            } else {
                responseJson(res, {rooms: rows});
            }
        });
    };
    
    me.allRooms = function (req, res) {
        roomService.allRooms(function (err, rows) {
            if (err || !rows || rows.length == 0) {
                logger.info("all room empty", err);
                responseJson(res, {rooms: []});
            } else {
                responseJson(res, {rooms: rows});
            }
        });
    };

    return me;
};