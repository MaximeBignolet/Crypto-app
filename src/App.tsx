import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { CryptoAppRoutes } from './components/CryptoAppRoutes'
import { Layout } from './components/Layout'

function App() {

  return (
       <BrowserRouter>
            <Layout>
                 <CryptoAppRoutes />
            </Layout>
       </BrowserRouter>
  )
}

export default App
