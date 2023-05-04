// import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import MainLayout from './Layout/MainLayout'
import 'bootstrap/dist/css/bootstrap.css'
import { ReactQueryDevtools } from 'react-query/devtools'
import '../styles/homepage.css'
import '../styles/menu.css'
import '../styles/form.css'
import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const MenuContext = createContext({ menu: false, setMenu: (menu: boolean) => { } })
export const PageContext = createContext({ page: false, setPage: (page: boolean) => { } })
const queryclient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const[page,setPage]= useState(false)
  const [menu, setMenu] = useState(false)
  useEffect(()=>{
    if(window.localStorage.getItem('token')){
      router.push('/')
      setMenu(true)
    }else{
      router.push({pathname:'/login'})
      setMenu(false)
    }
  },[])

  return(
    <>
      <QueryClientProvider client = {queryclient} >
        <PageContext.Provider value={{page, setPage}}>
          <MenuContext.Provider value={{ menu, setMenu }}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
            {/* <ReactQueryDevtools/> */}
          </MenuContext.Provider>
        </PageContext.Provider>
      </QueryClientProvider>
    </>
  )
}

