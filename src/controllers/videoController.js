import Video from "../models/Video";

export const home = async(req, res) => {
    const videos = await Video.find({});
    return res.render("home", {pageTitle:"Home", videos})
};
export const watch = (req, res) => {
    const { id } = req.params;
    return res.render("watch", {pageTitle:`Watching: `});
};
export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", {pageTitle:`Editing: `});
};
export const postEdit = (req, res) => {
    const { title } = req.body;
    const { id } = req.params;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle:"Upload Video"});
};

export const postUpload = (req, res) => {
    const { title } = req.body;
    const newVideo = {
        title,
        rating:0,
        comments:0,
        createdAt:"just now",
        views:0,
    }
    return res.redirect(`/`)
};