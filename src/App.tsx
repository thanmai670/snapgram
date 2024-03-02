import {Routes, Route} from 'react-router-dom';
import SinginForm from './_auth/forms/SinginForm';
import SignupForm from './_auth/forms/SignupForm';
import './globals.css';
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster"


const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* {public routes} */}
            <Route element={<AuthLayout/>}>
            <Route path='/sign-in' element={<SinginForm/>}/>
            <Route path='/sign-up' element={<SignupForm/>}/>
            </Route>

            {/* private Routes */}
            <Route element={<RootLayout/>}>
            <Route index element ={<Home/>}/>
            <Route path='/explore' element={<Explore/>}/>
            <Route path='/saved' element={<Saved/>}/>
            <Route path='/all-users' element={<AllUsers/>}/>
            <Route path='/create-post' element={<CreatePost/>}/>
            <Route path='/update-post/:id' element={<EditPost/>}/>
            <Route path='/posts/:id' element={<PostDetails/>}/>
            <Route path='/profile/:id/*' element={<Profile/>}/>
            <Route path='/update-profile/:id' element={<UpdateProfile/>}/>
            </Route>
            

        </Routes>
        <Toaster/>
    </main>
  )
}

export default App