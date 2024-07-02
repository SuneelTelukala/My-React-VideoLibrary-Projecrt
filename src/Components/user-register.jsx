import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function UserRegister() {
  const [users, setUsers] = useState([]);
  const [userError, setUserError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:2200/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      UserId: '',
      UserName: '',
      Password: '',
      Email: '',
      Mobile: ''
    },
    onSubmit: (user) => {
      axios.post('http://127.0.0.1:2200/adduser', user)
        .then(() => {
          alert('Registered Successfully.');
          navigate('/userlogin');
        })
        .catch(error => {
          console.error('Error registering user:', error);
        });
    }
  });

  function VerifyUser(e) {
    const userId = e.target.value;
    const userExists = users.some(user => user.UserId === userId);
    setUserError(userExists ? "User Id Taken - Try Another" : "User Id Available");
  }

  return (
    <div>
      <h4>Register User</h4>
      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>User Id</dt>
          <dd>
            <input
              type="text"
              name="UserId"
              onKeyUp={VerifyUser}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.UserId}
            />
          </dd>
          <dd>{userError}</dd>
          <dt>User Name</dt>
          <dd>
            <input
              type="text"
              name="UserName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.UserName}
            />
          </dd>
          <dt>Password</dt>
          <dd>
            <input
              type="password"
              name="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Password}
            />
          </dd>
          <dt>Email</dt>
          <dd>
            <input
              type="email"
              name="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Email}
            />
          </dd>
          <dt>Mobile</dt>
          <dd>
            <input
              type="text"
              name="Mobile"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Mobile}
            />
          </dd>
        </dl>
        <button type="submit" className="btn btn-primary">Register</button>
        <Link to="/" className="btn btn-light ms-2">Cancel</Link>
      </form>
    </div>
  );
}
