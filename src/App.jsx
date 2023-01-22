import './App.css'
import Header from './commponent/Header';
import Home from './commponent/Home';
import BoardList from './commponent/BoardList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:list" element={<BoardList />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
