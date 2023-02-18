import Navbar from '../components/navbar'
import Mainpage from '../components/mainpage'

export default function Home() {
  return (
    <div className='bg-indigo-400 w-screen flex flex-col'>
      <Navbar/>
      <Mainpage/>
    </div>
  )
}
