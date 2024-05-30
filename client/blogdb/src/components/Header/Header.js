
import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../redux/slices/userAuthorSlice";

function Header() {
  let { loginUserStatus, currentUser } = useSelector(
    (state) => state.userAuthorLoginReducer
  );

  let dispatch = useDispatch();

  function signOut() {
    //remove token from local storage
    localStorage.removeItem('token');
    dispatch(resetState());
  }

  return (
    <nav className="navbar navbar-expand-lg navbar text-light border-body" style={{ 'backgroundColor': '#33383c', 'color': 'white' }}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <div className="logo-container"> {/* Added a container for the logo */}
            <img src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png" alt="logo" className="logo-img" /> {/* Added the logo image */}
          </div>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {loginUserStatus === false ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-primary me-2 ps-4 pe-4">
                    <NavLink className="nav-link text-light" to="">
                      Home
                    </NavLink>
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-primary me-2 ps-4 pe-4">
                    <NavLink className="nav-link text-light" to="signup">
                      SignUp
                    </NavLink>
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-primary me-2 ps-4 pe-4">
                    <NavLink className="nav-link text-light" to="signin">
                      SignIn
                    </NavLink>
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item text-light">
                <p className="fs-2 mb-2 me-3">Welcome {currentUser.username},</p>
                <button className="btn btn-outline-primary  ps-4 pe-4 mb-1" style={{ 'marginLeft': '40%' }}>
                  <NavLink
                    className="nav-link text-light"
                    to="signin"
                    onClick={signOut}
                  >
                    Signout
                  </NavLink>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
