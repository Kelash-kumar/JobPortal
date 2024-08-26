import { useNavigate } from "react-router-dom"
const RegisterCompany = () => {
  const navigate = useNavigate();
  return (
    <div className="create-company-form-container">
        <form className="create-company-form">
            <h1>Your company Name</h1>
            <p>You can change this name after any time.</p>
            <input type="text" name="name" />
            <div className="form-buttons">
              <button
              onClick={()=>navigate('/admin/companies')} 
              >cancle</button>
              <button type="submit"
              // onClick={handleRegister}
              >Continue</button>
            </div>
        </form>
    </div>
  )
}

export default RegisterCompany