import User from "../models/User";

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
    await User.create({
        email, username, password, name, location
    });
    return res.redirect("/login");
};
export const login = (req, res) => res.send("Login");
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See User");