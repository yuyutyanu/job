'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'User.encryptPassword')
  }
  static get deleteTimestamp () {
    return 'deleted_at'
  }
  company () {
    return this.belongsTo('App/Model/Company')
  }
  label () {
    return this.hasMany('App/Model/Label')
  }
}

module.exports = User
