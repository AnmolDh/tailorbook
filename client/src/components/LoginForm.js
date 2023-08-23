import { Box, TextField, MenuItem, Button } from "@mui/material";

function LoginForm(props) {
  const boxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const formStyle = {
    display: "block",
    margin: "20px",
  };

  return (
    <Box sx={boxStyle}>
      <form onSubmit={props.handleSubmit}>
        {props.type === "login" && (
          <TextField
            sx={formStyle}
            id="outlined-select-currency"
            select
            defaultValue="admin"
            label="User Type"
            name="userType"
            value={props.data.userType}
            onChange={props.handleData}
          >
            <MenuItem key="admin" value="admin">
              Admin
            </MenuItem>
            <MenuItem key="user" value="user">
              User
            </MenuItem>
          </TextField>
        )}
        <TextField
          sx={formStyle}
          variant="standard"
          type="text"
          required
          label="Username"
          name="username"
          value={props.data.username}
          onChange={props.handleData}
        />

        <TextField
          sx={formStyle}
          variant="standard"
          type="password"
          required
          label="Password"
          name="password"
          value={props.data.password}
          onChange={props.handleData}
        />
        <Button sx={formStyle} type="submit" variant="contained">
          {props.type}
        </Button>
      </form>
    </Box>
  );
}

export default LoginForm;
