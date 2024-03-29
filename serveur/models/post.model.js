let posts = require('../data/posts.json')
const filename = './data/posts.json'
const helper = require('../helpers/helper.js')

function getPosts() {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject({
                message: 'no posts available',
                status: 202
            })
        }

        resolve(posts)
    })
}

function getPost(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(post => resolve(post))
        .catch(err => reject(err))
    })
}

function insertPost(newPost) {
    return new Promise((resolve, reject) => {
        const id = { _id: helper.getNewId(posts) }

        
        newPost = { ...id, ...newPost }
        posts.push(newPost)
        helper.writeJSONFile(filename, posts)
        resolve(newPost)
    })
}

function updatePost(id, newPost) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(post => {
            const index = posts.findIndex(p => p.id == post.id)
            id = { _id: post.id }
          
            posts[index] = { ...id, ...newPost }
            helper.writeJSONFile(filename, posts)
            resolve(posts[index])
        })
        .catch(err => reject(err))
    })
}

function deletePost(id) {
    return new Promise((resolve, reject) =>{
        helper.mustBeInArray(posts, id)
        .then(() =>{
            posts = posts.filter(p => p._id != id)
            console.log(posts)
            helper.writeJSONFile(filename, posts)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertPost,
    getPosts,
    getPost, 
    updatePost,
    deletePost
}