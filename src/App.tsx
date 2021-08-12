import React from 'react'
import AppRoutes from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRoutes/>
      </QueryClientProvider>
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={true}
      />
    </>
  )
}
