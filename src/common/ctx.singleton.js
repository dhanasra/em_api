let ctx = {
  req: null,
  res: null,
  config: null,
  user: null,
  user: null,
}


module.exports.ctx = {
    set: (context) => {
      ctx = context
    },
    get: () => ctx,
  
    set req (req) {
      ctx.req = req
    },
    get req () {
      return ctx.req
    },
  
    set res (res) {
      ctx.res = res
    },
    get res () {
      return ctx.res
    },
  
    set config (config) {
      ctx.config = config
    },
    get config () {
      return ctx.config
    },
  
    set user (user) {
      ctx.user = user
    },
    get user () {
      return ctx.user
    },
  
}
  