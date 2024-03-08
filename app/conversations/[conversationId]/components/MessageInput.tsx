"use client"


import { FieldValues, FieldErrors, UseFormRegister } from 'react-hook-form';



interface MessageInputProps {
    id: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}


const MessageInput = ({
    id,
    placeholder,
    type,
    required,
    register,
    errors
}: MessageInputProps) => {
    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                autoComplete={id}
                {...register(id, { required })}
                placeholder={placeholder}
                className="
                    py-2
                    px-4
                    text-black
                    font-light
                    bg-neutral-100
                    w-full
                    rounded-full
                    focus:outline-none
                "
            />
        </div>
    )
}

export default MessageInput;