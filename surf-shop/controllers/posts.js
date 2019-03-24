const Post = require("../models/post");
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'navinnavi19',
    api_key: '175327446383615',
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {
    // Posts Index Page 
    async postIndex(req, res, next) {
        let posts = await Post.find({});
        res.render("posts/index", { posts });
    },
    
    // Posts New Page
    postNew(req, res, next) {
    res.render("posts/new");
    },
    
    // POST the New Posts to Show Page
    async postCreate(req, res, next) {
        req.body.post.images = [];
        for( const file of req.files) {
            // add image to cloudinary
            let image = await cloudinary.v2.uploader.upload(file.path);
            // add image to mongodb
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }
        let post = await Post.create(req.body.post);
        res.redirect(`/posts/${post.id}`);
    },
    
    // GET a particular post Show Page
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render("posts/show", { post });
    },
    
    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render("posts/edit", { post });
    },
    
    async postUpdate(req, res, next) {
        // Deletion of existing Images
        // Find the post by ID
        let post = await Post.findById(req.params.id);
        // check if there's image for deleting
        if(req.body.deleteImages && req.body.deleteImages.length) {
            let deleteImages = req.body.deleteImages;
            // loop through images and delete the images
            for( const public_id of deleteImages) {
                // delete the image stored at cloudinary
                await cloudinary.v2.uploader.destroy(public_id);
                for(const image of post.images) {
                    // delete the image stored at mongodb
                    if(image.public_id === public_id) {
                        let index = post.images.indexOf(image);
                        post.images.splice(index, 1);
                    }
                }
            }
        }
        // check if there is any new images to upload
        if(req.files) {
            for( const file of req.files) {
                // add image to cloudinary
                let image = await cloudinary.v2.uploader.upload(file.path);
                // add image to mongodb
                post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                });
            }
        }
        // update the remaining fields that come from PUT form
        post.title = req.body.post.title;
        post.price = req.body.post.price;
        post.description = req.body.post.description;
        post.location = req.body.post.location;
        // save the post to db
        post.save();
        // redirect to that Show Post
        res.redirect(`${post.id}`);
    },
    
    async postDestroy(req, res, next) {
        // Deletion of all Images
        // Find the post by ID
        let post = await Post.findById(req.params.id);
        for( const image of post.images) {
            // delete the image stored at cloudinary
            await cloudinary.v2.uploader.destroy(image.public_id);
        }
        // Delete the entire post
        await post.remove();
        res.redirect('/posts');
    }
    
};