const dummy = (blogs) => {
  return blogs ? 1 : 0
}


const totalLikes = (blogs) => {
  const reducer = (sum, element) => {
    return sum + element.likes
  }
  return blogs.length ? blogs.reduce(reducer, 0) : 0
}

const favoriteBlog = (blogs) => {
  var mostLikedBlog = {}, max = 0
  blogs.map(({ title, likes, author }) => {
    if (likes > max) {
      max = likes
      mostLikedBlog.title = title
      mostLikedBlog.likes = likes
      mostLikedBlog.author = author
    }
  })
  return mostLikedBlog
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}