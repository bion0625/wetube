import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", {pageTitle:"Create Account"});
export const postJoin = async (req, res) => {
    const pageTitle = "Create Account";
    const{email, username, password, password2, name, location} = req.body;
    if(password !== password2){
        return res.status(400).render("join", {pageTitle: pageTitle, errorMassage:"Password confirmation does not match."});
    }
    const userExists = await User.exists({$or:[{email}, {username}]});// or절 where users.email = email or users.username = username
    if(userExists){
        return res.status(400).render("join", {pageTitle: pageTitle, errorMassage:"This username or email is already taken."});
    }
    try{
        await User.create({
            email, username, password, name, location
        });
        return res.redirect("/login");
    }catch{
        return res.status(400).render("join", {
            pageTitle: pageTitle,
            errorMessage: error._message
        });
    }
};
export const getLogin = (req, res) => res.render("login", {pageTitle:"Log in"});
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username});
    const pageTitle = "Login";
    if(!user){
        return res.status(400).render("login", {pageTitle, errorMassage:"An account with this username does not exists."})
    }
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login", {pageTitle, errorMassage:"Wrong password."})
    }
    req.session.loggedIn = true;
    req.session.user = user;
    res.redirect("/");
}
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See User");