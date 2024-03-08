import Sidebar from "../components/sidebar/Sidebar"
import getUsers from '@/app/actions/getUsers'
import UserList from "./components/UserList"


export default async function name({
    children
}:{ 
    children:React.ReactNode
}) {
    const users = await getUsers()
   
    return (
        <Sidebar>
            <div className="h-full">
                <UserList items={users} />
                {children}
            </div>
        </Sidebar>
    )
}

