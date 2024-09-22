import ContactPageMap from "../_components/contactmap"
import Layout from "../_featured/layout/layout"
import AdminPanel from "../_components/ContactAdminPanel"

export default function Contact(){
    return(
        <div>
            <Layout>
            <ContactPageMap/>
           <AdminPanel/>
            </Layout>
            </div>
    )
}