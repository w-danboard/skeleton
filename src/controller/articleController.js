class ArticleController {
  async add (ctx, next) {
    ctx.success({name: '刘喻'})
    // ctx.body = {name: '刘喻'}
    // await ctx.render('a', { name: 100 })
  }
  list (ctx, next) {
    ctx.body = '文章列表'
  }
};

module.exports = ArticleController;