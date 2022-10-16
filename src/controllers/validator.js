const moviesValidator = ({img,release,title,characters,score}) => {   
    const ulrValidator =  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(img)
    const releaseValidator = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(release)
    const titleValidator = (typeof title === 'string') && title.length < 50
    if(characters){
        var charactersValidator = characters.some(e => Number.isInteger(e)) 
    }else charactersValidator = true
    const scoreValidator = Number.isInteger(score)
    if(ulrValidator && releaseValidator && titleValidator && charactersValidator && scoreValidator) return true
    else false
}

const characterValidator = ({img,name,size,age,story,movies}) => {    
    const ulrValidator =  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(img)
    const nameValidator = (typeof name === 'string') && name.length < 50
    const storyValidator = (typeof story === 'string') && story.length < 500
    const ageValidator =  Number.isInteger(age)
    const sizeValidator = size === parseFloat(size)
    if(movies){
        var moviesValidator = movies.some(e => Number.isInteger(e))
    }else moviesValidator = true
    if(ulrValidator && nameValidator && storyValidator && ageValidator && sizeValidator && moviesValidator) return true
    else false
}

const userValidator = (userName,password,email) => {
    const userNameValidator = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/.test(userName)
    if(!userNameValidator) return {switch:true,msg:'invalid user'}
    const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/.test(password)
    if(!passwordValidator) return {switch:true,msg:'invalid password'}
    const emailValidator = /\S+@\S+\.\S+/.test(email)
    if(!emailValidator) return {switch:true,msg:'invalid email'}
    return false   
};

module.exports = {
    moviesValidator,
    characterValidator,
    userValidator,
}