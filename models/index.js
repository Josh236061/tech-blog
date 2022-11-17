
const User=require('./User');
const Post=require('./Post');
const Comment=require('./Comment');

/* User and Post: 1-to-Many relation */

/* 'CASCADE' "belongs to" - verification */

Post.belongsTo(User,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
});

User.hasMany(Post,{
    foreignKey:'user_id',
    
})




/* Post and Comment: 1-to-Many relation */

Comment.belongsTo(Post,{
    foreignKey:'post_id',
    onDelete:'CASCADE'
});

Post.hasMany(Comment,{

    foreignKey:'post_id',
})



/* Comment and User: 1-to-Many relation */

Comment.belongsTo(User,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
});

User.hasMany(Comment,{

    foreignKey:'user_id',

})


module.exports = {User,Comment,Post};

