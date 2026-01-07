export function saveUser(data){
    localStorage.setItem('user', JSON.stringify(data))
}

export function getUser(){
    return JSON.parse(localStorage.getItem('user'))
}

export function removeUser(){
    localStorage.removeItem('user')
}   