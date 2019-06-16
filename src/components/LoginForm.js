import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  return (
    <div>
      <h2>Kirjaudu</h2>

      <form onSubmit={handleSubmit}>
        <div>
          käyttäjätunnus
          <input
            type={username.type}
            value={username.value}
            onChange={username.onChange}
            reset={username.reset}
          />
        </div>
        <div>
          salasana
          <input
            type={password.type}
            value={password.value}
            onChange={password.onChange}
            reset={password.reset}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  //handleUsernameChange: PropTypes.func.isRequired,
  //handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm