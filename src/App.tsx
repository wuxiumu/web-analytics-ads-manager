import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import BasicLayout from './layout/BasicLayout'
import Home from './pages/Home'
import SiteAdd from './pages/SiteAdd'
import SiteEdit from './pages/SiteEdit'
import SiteDetail from './pages/SiteDetail'
import Demo from './pages/Demo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BasicLayout />}>
          <Route index element={<Home />} />
          <Route path="site/add" element={<SiteAdd />} />
          <Route path="site/:id/edit" element={<SiteEdit />} />
          <Route path="site/:id" element={<SiteDetail />} />
        </Route>
        <Route path="/demo/:id" element={<Demo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
