import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"

const Layout = ({ children, activeMenu }) => {
    
    return (
        <>
        <Header activeMenu={activeMenu}/>
        { children }
        <Footer />
        </>
    )
}


export default Layout