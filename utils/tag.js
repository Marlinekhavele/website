module.exports.getPopularTagString = (toolTags, count) => {
  let tags = toolTags.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1))
  let usedtags = tags.slice(0, count)
  if (usedtags.length < 2) {
    return usedtags
  } else if (usedtags.length === 2) {
    return `${usedtags[0]} and ${usedtags[1]}`
  } else {
    if (usedtags.length < tags.length) {
      return `${usedtags.slice(0, count).join("/")} and more`
    } else {
      return `${usedtags.slice(0, count - 1).join("/")} and ${
        usedtags[usedtags.length - 1]
      }`
    }
  }
}
