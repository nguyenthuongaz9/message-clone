"use client"

import Button from "@/app/components/Button";
import Input from "@/app/components/input/Input";
import { useCallback, useState , useEffect} from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const session = useSession();
    const router = useRouter();
    useEffect(()=>{
        if(session?.status==="authenticated"){
            router.push('/users')
        }
    },[session?.status, router])

    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN')
        }
    }, [variant])


    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === "REGISTER") {
            axios.post("/api/register",data)
                .then(()=> signIn('credentials',data))
                .catch(()=> toast.error('Something went wrong'))
                .finally(()=> setIsLoading(false))
        }

        if (variant === "LOGIN") {
            signIn('credentials',{
                ...data,
                redirect:false
            })
            .then((callback)=>{
                if(callback?.error){
                    toast.error('Invalid Credentials');
                }

                if(callback?.ok){
                    toast.success('Logged In')
                    router.push('/users')
                }
            })
            .finally(()=> setIsLoading(false))
        }

    }



    return (
        <div
            className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-md
            "
        >
            <div
                className="
                    bg-white
                    px-4
                    py-8
                    shadow
                    sm:rounded-lg
                    sm:px-10
                "
            >
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === "REGISTER" && (
                        <Input
                            id="name"
                            label="Name"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    )}
                    <Input
                        id="email"
                        label="Email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}

                    />
                    <Input
                        id="password"
                        label="Password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />

                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === "LOGIN" ? "Sign In" : "Register"}
                        </Button>
                    </div>
                </form>

               

                <div
                    className="
                        flex
                        gap-2
                        justify-center
                        text-sm
                        mt-6
                        px-2
                        text-gray-500
                    "
                >   
                    <div>
                        {variant === "LOGIN" ? 'New to Messenger?' : "Already an account"}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === "LOGIN" ? 'Create an account' : "Login"}
                    </div>



                </div>



            </div>


        </div>
    )
}

export default AuthForm