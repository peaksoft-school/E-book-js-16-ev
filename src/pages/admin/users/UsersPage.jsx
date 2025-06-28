import { useNavigate } from 'react-router'
import Table from '../../../components/UI/Table'
const UsersPage = () => {
   const navigate = useNavigate()

   const handleRowClick = (id) => {
      navigate(`/admin/users/${id}`)
   }
   return (
      <div>
         <Table variant="A" onRowClick={handleRowClick} />
      </div>
   )
}

export default UsersPage
