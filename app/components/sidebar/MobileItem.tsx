'use client'

import Link from "next/link";
import clsx from "clsx"


interface MobileItemProps{
    href: string;
    active?: boolean;
    icon:any;
    onClick?: ()=>void;
}


const MobileItem = ({
    href,
    active,
    icon: Icon,
    onClick
}: MobileItemProps) => {


    const handleClick = ()=>{
        if(onClick){
            return onClick()
        }
    }
  return (
    <Link 
        onClick={handleClick}
        href={href}
        className={clsx(`
            group
            flex
            gap-x-3
            text-sm
            leading-6
            font-semibold
            w-full
            justify-center
            p-4
            text-gray-500
            hover:text-black
            hover:bg-gray-100 
        `,
            active && 'bg-gray-100 text-gray-900'
        )}
    >
        <Icon 
            className="h-6 w-6"
        />
    </Link>
  )
}

export default MobileItem