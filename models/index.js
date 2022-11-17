
const User=require('./User');
const Post=require('./Post');
const Comment=require('./Comment');

/* Relation between User and Post :One to Many relation,Where User has Many Posts and Post belongs to one user */
//onDelete:'CASCADE' this has to be on belongs to for this to work

Post.belongsTo(User,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
});

User.hasMany(Post,{
    foreignKey:'user_id',
    
})




/*Relation between Post and Comment:One to Many relation where Post has many Comment and comment belong to a post */

Comment.belongsTo(Post,{
    foreignKey:'post_id',
    onDelete:'CASCADE'
});

Post.hasMany(Comment,{

    foreignKey:'post_id',
})



/*Relation between Comment and User:One to Many relation where User has many Comment and comment belong to a user */

Comment.belongsTo(User,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
});

User.hasMany(Comment,{

    foreignKey:'user_id',

})


module.exports = {User,Comment,Post};

