const jwt=require('jsonwebtoken')

const authenticateUser=(req,res,next)=>{
    let token=req.header('authorization')
    if (token) {
        token=token.split(' ')[1]
    try {
      const tokenData=jwt.verify(token,process.env.JWT_KEY)
        req.user={
            id:tokenData.id,
             name:tokenData.name
        }
        next()
    } catch (error) {
        res.json(error)
    }
    }else{
        res.json({error:'token not present'})
    }
    
}

module.exports=authenticateUser