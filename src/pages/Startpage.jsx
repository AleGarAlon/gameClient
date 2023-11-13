
import { Link } from 'react-router-dom';
import './starpage.css';

function StartPage() {
  return (
    <>
      <h1 className='gameTitle'>Last path</h1>
      <div className="startPageBtns">
        <Link className="signupBtn" to="/signup">Signup</Link>
        <Link className="loginBtn" to="/login">Login</Link>
      </div>
    </>
  );
}

export default StartPage;