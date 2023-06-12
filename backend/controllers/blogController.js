import BlogModel from "../models/BlogModel.js";

// show all blogs on GET
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    // use res.render to load up an ejs view file
    // res.render() automatically looks in the views folder

    res.status(200).render("pages/index", { blogs });
  } catch (error) {
    res.status(404).json({ message: `THERE'S A PROBLEM: ${error}` });
  }
};

// show form to create a new blog on GET
export const getBlogCreateForm = async (req, res) => {
  try {
    await res.status(200).render("pages/createBlog");
  } catch (error) {
    res.status(404).json({ message: `THERE'S A PROBLEM: ${error}` });
  }
};

// handle creation of new blog on POST
export const createNewBlog = async (req, res) => {
  try {
    await BlogModel.create(req.body);
    console.log(`New Data Added to Database: ${req.body}`);
    res.redirect("/");
  } catch (error) {
    res.status(404).json({ message: `THERE'S A PROBLEM: ${error}` });
  }
};

// handle get specific blog
export const currentBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const currentBlog = await BlogModel.findById(id);
    if (id === !currentBlog.id) {
      res.status(400).json({ message: "Sorry, blog does not exist!" });
    }
    res.status(200).render("pages/currentBlog", { currentBlog });
  } catch (error) {
    res.status(404).json({ message: `THERE'S A PROBLEM: ${error}` });
  }
};

export const getSpecificBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const specificBlog = await BlogModel.findById(id);
    if (id === !specificBlog.id) {
      res.status(400).json({ message: "Sorry, blog does not exist!" });
    }
    res.status(200).render("pages/updateBlog", { specificBlog });
  } catch (error) {
    res.status(404).json({ message: `THERE'S A PROBLEM: ${error}` });
  }
};

// handle update of specific blog on PUT
export const updateSpecificBlog = async (req, res) => {
  try {
    const { id } = req.params; // get id from url
    const blog = await BlogModel.findByIdAndUpdate(id, req.body); // update specific blog

    console.log(`URL params: ${id}`);
    console.log(`BLOG id: ${blog.id}`);

    if (id !== blog.id)
      // check if blog have matching id's
      return res.status(404).json({ message: "This blog does not exist!" });

    res.status(200).redirect("/"); // redirect to home page if succesful
  } catch (error) {
    res.status(404).json({ message: `THERE'S A PROBLEM: ${error}` });
  }
};

// handle delete for specific blog
export const deleteSpecificBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await BlogModel.findByIdAndDelete(id);
    console.log(`Blog has successfully deleted: ${id}`);
    res.status(200).redirect("/");
  } catch (error) {
    res.status(404).json({ message: `THERE'S A PROBLEM: ${error}` });
  }
};
