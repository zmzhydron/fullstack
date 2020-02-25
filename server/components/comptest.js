const shitnigger = {
    kendralust: async (ctx, next) => {
        console.log("shit niggerorooooo~~~~~");
        ctx.body = "fucking kendralust doggy style";
        await next();
    },
    setllacox: (req,res,next) => {
        // res.send("this is setlla cox speaking");
        next();
    }
}

// app.use(async (ctx,next) => {
//     console.log(ctx);
//     await next();
//     console.log(6);
// });
// app.use(async (ctx,next) => {
//     console.log(2);
//     await next();
//     console.log(5);
// });
// app.use(async (ctx,next) => {
//     console.log(3);
//     next();
//     console.log("@");
// });
// app.use(async (ctx,next) => {
//     console.log(4);
//     await next();
//     console.log('##');
// });

module.exports = shitnigger;