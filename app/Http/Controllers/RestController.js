const RestService = require('../../Service/RestService')
const AttendanceService = require('../../Service/AttendanceService')
const RestContext = require('../Contexts/RestContext')
const HttpService = require('../../Service/HttpService')

class RestController {
  constructor (){
    this.restContext = new RestContext()
    this.httpService = new HttpService()
    this.restService = new RestService()
    this.attendanceService = new AttendanceService()
  }

  * start (req, res) {
    const loginUser = yield req.auth.getUser()
    const attendance = yield this.attendanceService.lastUpdated(loginUser)
    const startContext = this.restContext.startContext(req)
    const rest = yield this.restService.start(attendance, startContext)
    return this.httpService.success(res, {rest})
  }

  * end (req, res) {
    const loginUser = yield req.auth.getUser()
    const attendance = yield this.attendanceService.lastUpdated(loginUser)
    const endContext = this.restContext.endContext(req)
    const rest = yield this.restService.end(attendance, endContext)
    return this.httpService.success(res, {rest})
  }

  * lastUpdated(req, res){
    const loginUser = yield req.auth.getUser()
    const attendance = yield this.attendanceService.lastUpdated(loginUser)
    const rest = yield this.restService.lastUpdated(attendance)
    return this.httpService.success(res, {rest})
  }
}

module.exports = RestController