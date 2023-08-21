document.querySelector('#github-form').addEventListener('submit', (event)=>{
    event.preventDefault();
    handleUserSearch(event.target.search.value)})

function handleUserSearch(name){
    const url = `https://api.github.com/search/users?q=${name}`;
    const data = {
        user:name
    };
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then(response=>response.json())
    .then(userData =>{
        console.log(userData);
        const userMatch = userData.items.find((element)=>{
            return element.login === name});
            // console.log(userMatch);
            if(userMatch){
                console.log(userMatch)
                handleFoundUser(userMatch);
            } else {
                console.log('name not found')
            }
        
        // console.log(userMatch);

        })
        
    .catch(error=>console.log('Error', error))
};

function handleFoundUser(userMatch){
    let userCollection = document.querySelector('#user-list');
    const userCard = document.createElement('div');
    userCard.setAttribute('class', 'card');

    const printName = document.createElement('p');
    printName.textContent = userMatch.login;
    userCard.appendChild(printName);
    //event listener on user
    printName.addEventListener('click', (e)=>{
        // console.log(e);
        const userClicked = userMatch.login;
        const url = `https://api.github.com/users/${userClicked}/repos`;
        const searchedName =  {
        username: 'userClicked'}
        // console.log(userClicked);
        fetch(url,{
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json"
        }
    })
        .then(response=>response.json())
        .then(data=>{
            // console.log(data);
            let repoContainer = document.getElementById('repos-list');
            data.forEach((element)=>{
                // console.log(element.name);
                const createLi = document.createElement('li');
                const repoList = element.name
                console.log(repoList);
                createLi.innerText = repoList;
                repoContainer.appendChild(createLi);
            })

        })
        .catch(error=>console.log('Error', error))
        })

    

    const userAvatar = document.createElement('img');
    userAvatar.setAttribute('src', userMatch.avatar_url)
    userCard.appendChild(userAvatar);

    userCollection.appendChild(userCard);
}


