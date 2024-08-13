import React from "react";

export const LoginPage = () => {

  const handleLogin = (provider:string) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  }

  return (
    <div>
      <section className="vh-100 mb-5">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{borderRadius:'1rem'}}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://st.depositphotos.com/46171552/60474/i/450/depositphotos_604745936-stock-photo-teenage-girl-sitting-floor-library.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{borderRadius:'1rem 0 0 1rem',height:'100%'}}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <div className="d-flex justify-content-center align-items-center mb-3 pb-1">
                          <i className="fas fa-cubes fa-2x me-3" style={{color:"#049e3a"}}></i>
                          <a type="button" href='/' style={{color:'black', textDecoration:'none'}}>
                            <span className="h1 fw-bold mb-0">Huy Library</span>
                          </a>
                        </div>

                        <h5
                          className="fw-normal d-flex justify-content-center align-items-center mb-3 pb-3"
                          style={{letterSpacing:'1px'}}
                        >
                          Sign into your account
                        </h5>

                        <div className="d-flex justify-content-center align-items-center mt-5">
                            <button 
                                data-mdb-button-init data-mdb-ripple-init className="btn btn-lg btn-outline-dark" 
                                style={{width:'350px'}}
                                onClick={() => handleLogin('google')} 
                                type="button">
                                <i className="fab fa-google me-3" style={{color:'#dd4b39'}}></i> Sign in with Google
                            </button>
                        </div>
                        <div className="divider">
                            <h5 className="lead">or</h5>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <button 
                                data-mdb-button-init data-mdb-ripple-init className="btn btn-lg mb-2 btn-outline-dark"
                                style={{width:'350px'}}
                                onClick={() => handleLogin('facebook')} 
                                type="button">
                                <i className="fab fa-facebook-f me-3" style={{color:'#3b5998'}}></i>Sign in with Facebook
                            </button>
                        </div>
                        <div className="divider">
                            <h5 className="lead">or</h5>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mb-5">
                            <button 
                                data-mdb-button-init data-mdb-ripple-init className="btn btn-lg mb-2 btn-outline-dark"
                                style={{width:'350px'}} 
                                onClick={() => handleLogin('github')} 
                                type="button">
                                <i className="fab fa-github me-3" style={{color:'#181717'}}></i>Sign in with Github
                            </button>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <a href="#!" className="text-muted">
                            Terms of use.
                            </a>
                            <a href="#!" className="text-muted">
                            Privacy policy
                            </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
