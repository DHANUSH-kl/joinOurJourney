import {User} from './models/user.model.js'





const isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        return res.redirect("/user/signin")
    } 
    next();
}

const isAgent = async (req,res,next) => {
    if(req.user){
        let user = await User.findById(req.user._id);
        if(user && user.isAgent == true) {
            next();
        }
        else{
            res.send("you dont have access to this page");
        }
    }
}

const isOwner = async (req,res,next) => {
    if(req.user){
        let user = await User.findById(req.user._id);
        if(user && user.isOwner == true) {
            next();
        }
        else{
            res.redirect('/signup/owner');
        }
    }
}

const hasAgentInfo = async (req,res,next) => {
    if( !req.user.tripLeader ) {
        res.redirect("/admin/tripleaderform");
    }
    next();
}

export { isLoggedIn , isAgent , isOwner , hasAgentInfo };