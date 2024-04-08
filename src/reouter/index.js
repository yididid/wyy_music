// import Loading from '@/components/loading';
import Layout from '../components/Layout/layout';
import { lazy, ReactNode, Suspense } from "react"
import { createBrowserRouter, Navigate } from 'react-router-dom';

const FindMusic = lazy(() => import('../components/FindMusic/index'));
const MyMusic = lazy(() => import('../components/MyMusic/index'));
const FollowMusic = lazy(() => import('../components/FollowMusic/index'));

//解决白屏现象
const lazyLoad = (children) => {
  return <Suspense fallback={<> loading </>}> {children} </Suspense>
}


const routes = [
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: lazyLoad(<FindMusic />)
      },
      {
        path: '/find',
        element: lazyLoad(<FindMusic />)
      },
      {
        path: '/my',
        element: lazyLoad(<MyMusic />)
      },
      {
        path: '/follow',
        element: lazyLoad(<FollowMusic />)
      }
    ]
  },
  {
    path: '/home',
    element: <MyMusic />
  },
  {
    path: '/login',
    element: <FollowMusic />
  },
  {
    path: "*",
    element: <Navigate to="/FindMusic" />
  }
]

export default routes
