const router=require('express').Router();

const {User,Post,Comment}=require('../../models');

/* Comment Additions - route */

router.post('/addComment', async (req, res) => {

   
    try {
      req.body.user_id=req.session.user_id;
      const commentData = await Comment.create(req.body);
     console.log("comment id in request",req.body.user_id);
      req.session.save(() => {
        req.session.post_id = req.body.post_id;
        
        res.json({
          message: "Comment Created",
        });
      });
      
      }

    catch (err) {
      res.status(400).json(err);
    }
  });


  /* New Post - route */
  
  router.post('/newpost', async (req, res) => {

try {
      req.body.user_id=req.session.user_id;
      const postData = await Post.create(req.body);

      req.session.save(() => {
        req.session.post_id = req.body.post_id;
        
        res.json(postData);

      });
      
      }
      catch(e){console.log(e);}
    }
    
    
    );


  
/* Update Post - route */
  
router.post("/edit", async (req, res) => {

  const updatePostData=await Post.update({title:req.body.title,content:req.body.content},{

        where:{id:req.body.postId}
  });


  if(updatePostData){

    res.status(200).json({logged_in:req.session.logged_in});
  }
  else{
    res.status(404).json({message:"Post Not Found !!!"});
  }
});


/* Delete Post - route */

router.delete("/delete/:postId", async (req, res) => {

  const deletedData=await Post.destroy({

        where:{id:req.params.postId}
  });


  if(deletedData){

    res.status(200).json({logged_in:req.session.logged_in});
  }
  else{
    res.status(404).json({message:"Post Not Found !!!"});
  }
});


  module.exports=router;