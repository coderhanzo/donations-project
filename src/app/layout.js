import { Montserrat } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import ToastProvider from './toast.provider';
import "react-toastify/dist/ReactToastify.css"

const inter = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Donor Management Platform - Bsystems  ',
  description: 'Enhance Your NGO’s Impact with Data-Driven Insights',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ToastProvider>{children}</ToastProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
