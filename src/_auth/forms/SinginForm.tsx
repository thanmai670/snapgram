import * as z from "zod"
import {Link}from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"

import { SigninValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { useNavigate } from "react-router-dom";

import {  useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

 


const SigninForm = () => {
  const { toast } = useToast()
  const {checkAuthUser, isLoading:isUserLoading}= useUserContext();
  const  navigate = useNavigate();

  const {mutateAsync:singInAccount} = useSignInAccount();
  
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email:"",
      password:"",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
   
    // signin User 
    const session = await singInAccount({
      email: values.email,
      password: values.password
    })
    
    if(!session){
      return toast({
        title:"Sign-in Failed. Please enter your credentials correctly"
      })
    }

    const isLoggedIn = await checkAuthUser();
    
    
  
    if(isLoggedIn){
      form.reset()
      navigate('/')
     
    }else{
      toast({
        title:"sign-up Failed. Please try again in sometime"
      })
    }
    
  }
  
  return (
  <Form {...form}>
    <div className="sm:w-420 flex-center flex-col">
      <img src="/assets/images/logo.svg" alt="logo" />

      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Login to your account.</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">welcome Back, please enter your details</p>


      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input type='email' className="shad-input" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type='password' className="shad-input" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="shad-button_primary">
          {isUserLoading ? (
            <div className="flex-center gap-2">
              <Loader/>
            </div>
          ):"Sign in"}
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account yet?
            <Link to='/sign-up' className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
        </p>
      </form>
    

    </div>
  </Form>
  )
}

export default SigninForm
