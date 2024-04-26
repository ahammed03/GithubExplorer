
import { RecoilRoot } from 'recoil'
import { GithubCmp } from './components/GithubCmp'
function App() {


  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
      <RecoilRoot>
        <GithubCmp />
      </RecoilRoot>
    </div>
  )
}

export default App
