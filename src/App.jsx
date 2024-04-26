
import { RecoilRoot } from 'recoil'
import { GithubCmp } from './components/GithubCmp'
import "./App.css"

function App() {


  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center mainCmp font-serif'>
      <RecoilRoot>
        <GithubCmp />
      </RecoilRoot>
    </div>
  )
}

export default App
