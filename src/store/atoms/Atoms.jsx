

import {  atom , selector} from "recoil";
export const usernameAtom = atom({
    key: 'usernameAtom',
    default : ""
})

export const userDataAtom = atom({
    key : "userDataAtom",
    default : selector({
        key:"userDataSelector",
        get : async({get})=>{
            const username = get(usernameAtom)
            if(username.length > 1){
                const response = await fetch(`https://api.github.com/users/${username}`);
                const data = await response.json();
                if (data.message === "Not Found") {
                    return false
                }else{

                    const userData = {
                        name : data.name,
                        email : data.email || false,
                        avatar_url : data.avatar_url || false,
                        twitter_url : data.twitter_url || false,
                        following : data.following,
                        followers : data.following,
                        created_at : data.created_at,
                        github_url: data.html_url,
                        public_repos : data.public_repos,
                        location : data.location,
                    

                }
                return userData
             }
                
            }else{
                return false
            }
        }
    })
})

function filterRepoData(repoArray) {
    return repoArray.map(repo => {
        const { name, html_url, forks_count, watchers_count } = repo;
        return { name, html_url, forks_count, watchers_count };
    });
}


export const reposAtom = atom({
    key : "reposAtom",
    default : selector({
        key:"reposSelector",
        get : async({get})=>{
            const username = get(usernameAtom)
            // const username = "ahammed03"
            if(username.length > 1){
                const response = await fetch(`https://api.github.com/users/${username}/repos`);
                const data = await response.json();
                if (data.message === "Not Found") {
                    return false
                }else{

                    const reposData = data.map((repo) => ({
                        name: repo.name,
                        html_url: repo.html_url,
                        forks: repo.forks,
                        watchers: repo.watchers
                    }));
                    // console.log(reposData);
                    
                        return reposData
                
             }
                
            }else{
                return false
            }
        }
    })
})

export const followingAtom = atom({
    key : "followingAtom",
    default : selector({
        key:"followingSelector",
        get : async({get})=>{
            const username = get(usernameAtom)
            // const username = 'ahammed03'
            if(username.length > 1){
                const response = await fetch(`https://api.github.com/users/${username}/following`);
                const data = await response.json();
                if (data.message === "Not Found") {
                    return false
                }else{

                    const followingData = data.map((repo) => ({
                        name: repo.login,
                        html_url: repo.html_url,
                        avatar_url : repo.avatar_url
                    }));
                    // console.log(followingData);
                    
                        return followingData
                
             }
                
            }else{
                return false
            }
        }
    })
})

export const followersAtom = atom({
    key : "followersAtom",
    default : selector({
        key:"followersSelector",
        get : async({get})=>{
            const username = get(usernameAtom)
            // const username = 'ahammed03'
            if(username.length > 1){
                const response = await fetch(`https://api.github.com/users/${username}/followers`);
                const data = await response.json();
                if (data.message === "Not Found") {
                    return false
                }else{

                    const followersData = data.map((repo) => ({
                        name: repo.login,
                        html_url: repo.html_url,
                        avatar_url : repo.avatar_url
                    }));
                    // console.log(followingData);
                    
                        return followersData
                
             }
                
            }else{
                return false
            }
        }
    })
})
