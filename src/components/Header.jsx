import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import {
  ALTA_PROSPECTO,
  INICIO,
  LISTADO_PROSPECTOS,
} from "../constantes/ConstantesRutas";

function Header() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({ left: false });

  const navegar = (ruta) => {
    if (ruta === "Listado Prospectos") {
      navigate(LISTADO_PROSPECTOS);
    } else {
      navigate(ALTA_PROSPECTO);
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Listado Prospectos", "Alta Prospecto"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton style={{ textAlign: "center" }}>
              <ListItemText
                style={{ color: "#00AC68", margin: "0", textAlign: "center" }}
                primary={text}
                onClick={() => navegar(text)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const logOut = () => {
    navigate(INICIO);
  };

  return (
    <div
      style={{
        backgroundColor: "#06a661",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        margin: "0 auto",
      }}
    >
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton aria-label="menu" onClick={toggleDrawer(anchor, true)}>
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
      {location.pathname === "/" ? null : (
        <IconButton title="Inicio" onClick={logOut}>
          <LogoutIcon style={{ color: "white" }} />
        </IconButton>
      )}
    </div>
  );
}
export default Header;
