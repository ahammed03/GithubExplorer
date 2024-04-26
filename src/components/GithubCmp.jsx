import { useCallback, useRef, useState, Suspense } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { followingAtom, followersAtom, reposAtom, userDataAtom, usernameAtom } from "../store/atoms/Atoms"
import { memo } from "react"


export function GithubCmp() {
    const [showMain, setShowMain] = useState(false)
    return (
        <div className="space-y-2">
            <h1 className="text-xl font-bold mb-2 text-center">GitHub Explorer <a href="https://ahammed.vercel.app" className="text-sm font-normal">by ahammed03</a></h1>
            <InputCmp setShowMain={setShowMain}></InputCmp>
            <Suspense fallback={<div>Loading ....</div>}>
                {showMain ? <MainCmp /> : null}

            </Suspense>

        </div>
    )
}

function MainCmp() {
    const userData = useRecoilValue(userDataAtom);
    const [showCmp, setShowCmp] = useState("")
    // console.log(userData);
    if (!userData) {
        return (
            <div className="text-center border-2 border-black rounded-md font-bold p-3">
                Invalid UserId
            </div>
        )
    } else {

        return (
            <div className="border-2 border-black rounded-md p-2 space-y-1">
                <ProfileCmp {...userData} />
                <SocialCmp {...userData} />
                <div className="grid grid-cols-3 items-center p-1 gap-1 text-slate-100">
                    <button onClick={() => setShowCmp("repo")} className="bg-black rounded-md shadow-sm py-0.5" type="button">repos</button>
                    <button onClick={() => setShowCmp("followers")} className="bg-black rounded-md shadow-sm py-0.5" type="button">followers</button>
                    <button onClick={() => setShowCmp("following")} className="bg-black rounded-md shadow-sm py-0.5" type="button">following</button>
                </div>
                <Suspense fallback={<div className="">Loading....</div>}>
                    {/* Need to add loading and make the atoms to atom family */}
                    {
                        showCmp === "repo" ? <ReposCmp /> : null
                    }
                    {
                        showCmp === "followers" ? <FollowersCmp /> : null
                    }
                    {
                        showCmp === "following" ? <FollowingCmp /> : null
                    }


                </Suspense>

            </div>
        )
    }

}


const ProfileCmp = memo(function ({ avatar_url, name, following, followers, public_repos }) {

    return (
        <div className="border-2 border-black rounded-md p-2 flex justify-between">
            <img className="w-16 h-16 rounded-full" src={avatar_url} alt="" />
            <div className="w-[70%]  text-center">
                <h2 className="font-bold ">{name}</h2>
                <div className="flex justify-around text-sm">
                    <div className="flex flex-col">
                        <span>{public_repos}</span>
                        <span>repos</span>
                    </div>
                    <div className="flex flex-col">
                        <span>{followers}</span>
                        <span>followers</span>
                    </div>
                    <div className="flex flex-col">
                        <span>{following}</span>
                        <span>following</span>
                    </div>
                </div>
            </div>

        </div>
    )

})
const FollowingCmp = memo(
    function () {
        const followingData = useRecoilValue(followingAtom)
        return (
            <div className="border-2 border-black rounded-md p-1 space-y-1 text-sm  h-max max-h-[50vh] overflow-auto" >
                <div className="flex justify-around items-center">
                    <p className="font-bold text-lg">following</p>
                </div>
                <hr />
                {
                    followingData.map((element, index) => {
                        return (

                            <div className="flex justify-around items-center p-1 text-sm" key={index}>
                                <img className="w-12 h-12 rounded-full " src={element.avatar_url} alt="" />
                                <p className="w-[50%] overflow-auto">{element.name}</p>
                                <a href={element.html_url ? element.html_url : ""}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link-2"><path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 1 1 0 10h-2" /><line x1="8" x2="16" y1="12" y2="12" /></svg>
                                </a>
                            </div>
                        )


                    })
                }

            </div>
        )

    }
)

const FollowersCmp = memo(
    function () {
        const followersData = useRecoilValue(followersAtom)
        return (
            <div className="border-2 border-black rounded-md p-1 space-y-1 text-sm h-max max-h-[50vh] overflow-auto" >
                <div className="flex justify-around items-center">
                    <p className="font-bold text-lg">following</p>
                </div>
                <hr />
                {
                    followersData.map((element, index) => {
                        return (

                            <div className="flex justify-around items-center p-1 text-sm" key={index}>
                                <img className="w-12 h-12 rounded-full " src={element.avatar_url} alt="" />
                                <p className="w-[50%] overflow-auto">{element.name}</p>
                                <a href={element.html_url ? element.html_url : ""}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link-2"><path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 1 1 0 10h-2" /><line x1="8" x2="16" y1="12" y2="12" /></svg>
                                </a>
                            </div>
                        )


                    })
                }

            </div>
        )

    }
)
const SocialCmp = memo(function ({ email, twitter_url, github_url, location }) {


    return (
        <div className="border-2 border-black rounded-md p-2 flex justify-around">

            <a href={`mailto:${email}`} className={email ? "" : "text-gray-400"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </a>
            <a href={`${twitter_url}`} className={twitter_url ? "" : "text-gray-400"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
            </a>
            <a href={`${location}`} className={location ? "" : "text-gray-400"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
            </a>
            <a href={`${github_url}`} className={github_url ? "" : "text-gray-400"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            </a>
        </div>
    )

}

)
const ReposCmp = memo(function () {
    const reposData = useRecoilValue(reposAtom);
    return (
        <div className="border-2 border-black rounded-md p-1 space-y-1 text-sm h-max max-h-[50vh] overflow-auto" >
            <div className="flex justify-around items-center">
                <p className="font-bold w-[50%] overflow-auto">Repo Name</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-git-fork"><circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" /><path d="M12 12v3" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
            </div>
            <hr />
            {
                reposData.map((element, index) => {
                    return (

                        <div className="flex justify-around items-center p-1 text-sm" key={index}>
                            <p className="w-[50%] overflow-auto">{element.name}</p>
                            <span>
                                {element.watchers}
                            </span>
                            <span>
                                {element.forks}
                            </span>
                            <a href={element.html_url ? element.html_url : ""}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link-2"><path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 1 1 0 10h-2" /><line x1="8" x2="16" y1="12" y2="12" /></svg>
                            </a>
                        </div>
                    )


                })
            }

        </div>
    )
}

)
const InputCmp = memo(function ({ setShowMain }) {
    const inputRef = useRef()
    const setUsername = useSetRecoilState(usernameAtom)

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            showMainFn();
        }
    }, []);

    const showMainFn = useCallback(() => {
        const username = inputRef.current.value;
        if (username.length > 1) {
            setUsername(username);
            inputRef.current.value = ""
            setShowMain(true)
        } else {
            alert("Invalid Input")
        }
    }, [])
    return (
        <div className="p-2 border-2  border-black rounded-sm space-x-1 ">
            <input ref={inputRef} autoFocus className="p-1 outline-none" type="text" placeholder="Enter Github Username"  onKeyPress={handleKeyPress}/>
            <button onClick={showMainFn} className="bg-black rounded-sm shadow-md text-white px-2 py-1" type="button">Search</button>
        </div>
    )

}

)
