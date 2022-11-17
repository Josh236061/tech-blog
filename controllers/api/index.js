
const router=require('express').Router();

const userRoutes=require('./userRoutes.js');
const postRoutes=require('./postRoutes.js');

router.use('/user',userRoutes);
router.use('/post',postRoutes);


module.exports=router;