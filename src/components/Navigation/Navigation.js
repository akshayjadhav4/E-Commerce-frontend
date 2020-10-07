import React, { useLayoutEffect, useState } from "react";
import "./Navigation.css";
import { Link, withRouter } from "react-router-dom";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  Grid,
  SwipeableDrawer,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { useSelector, useDispatch } from "react-redux";
import {
  signOut,
  selectAuthentication,
} from "../../features/authentication/authenticationSlice";
const useStyles = makeStyles({
  list: {
    width: 200,
  },
  padding: {
    paddingRight: 30,
    cursor: "pointer",
  },

  sideBarIcon: {
    padding: 0,
    color: "black",
    cursor: "pointer",
  },
});

function Navigation({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [drawer, setDrawer] = useState(false);
  const [activateDrawer, setActivateDrawer] = useState(false);

  // getting authentication state from store
  const { user } = useSelector(selectAuthentication);

  //   calculating screen size
  useLayoutEffect(() => {
    if (window.innerWidth <= 600) {
      setActivateDrawer(true);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 600) {
        setActivateDrawer(true);
      } else {
        setActivateDrawer(false);
      }
    });
  }, []);

  const CreateDrawer = () => {
    return (
      <div>
        <AppBar>
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <MenuIcon
                className={classes.sideBarIcon}
                onClick={() => {
                  setDrawer(true);
                }}
              />

              <Typography
                color="inherit"
                variant="headline"
                className="navigation__Logo"
              >
                <Link to="/" className="navigation__link">
                  My Store
                </Link>
              </Typography>
              <Typography color="inherit" variant="headline"></Typography>
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          open={drawer}
          onClose={() => {
            setDrawer(false);
          }}
          onOpen={() => {
            setDrawer(true);
          }}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              setDrawer(false);
            }}
            onKeyDown={() => {
              setDrawer(false);
            }}
          >
            <List className={classes.list}>
              {user ? (
                <>
                  {user?.role === 0 && (
                    <ListItem key={0} button divider>
                      <Link
                        to="/user/dashboard"
                        className={`navigation__link ${
                          history.location.pathname === "/user/dashboard" &&
                          "navigation__link--active"
                        }`}
                      >
                        <Typography
                          variant="subtitle1"
                          className={classes.padding}
                        >
                          My Account
                        </Typography>
                      </Link>
                    </ListItem>
                  )}
                  {user?.role === 1 && (
                    <ListItem key={1} button divider>
                      <Link
                        to="/admin/dashboard"
                        className={`navigation__link ${
                          history.location.pathname === "/admin/dashboard" &&
                          "navigation__link--active"
                        }`}
                      >
                        <Typography
                          variant="subtitle1"
                          className={classes.padding}
                        >
                          Dashboard
                        </Typography>
                      </Link>
                    </ListItem>
                  )}

                  <ListItem key={5} button divider>
                    <Link to="/" className="navigation__link">
                      <Typography
                        variant="subtitle1"
                        className={classes.padding}
                        onClick={() => {
                          dispatch(signOut());
                          history.push("/");
                        }}
                      >
                        Logout
                      </Typography>
                    </Link>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem key={2} button divider>
                    <Link
                      to="/signup"
                      className={`navigation__link ${
                        history.location.pathname === "/signup" &&
                        "navigation__link--active"
                      }`}
                    >
                      <Typography
                        variant="subtitle1"
                        className={classes.padding}
                      >
                        Sign Up
                      </Typography>
                    </Link>
                  </ListItem>
                  <ListItem key={3} button divider>
                    <Link
                      to="/signin"
                      className={`navigation__link ${
                        history.location.pathname === "/signin" &&
                        "navigation__link--active"
                      }`}
                    >
                      <Typography
                        variant="subtitle1"
                        className={classes.padding}
                      >
                        Sign In
                      </Typography>
                    </Link>
                  </ListItem>
                </>
              )}

              <ListItem key={4} button divider>
                <Link
                  to="/cart"
                  className={`navigation__link ${
                    history.location.pathname === "/cart" &&
                    "navigation__link--active"
                  }`}
                >
                  <div className="navigation__cartOption">
                    <ShoppingBasketIcon className="navigation__cartCount" />
                    <Typography variant="subtitle1" className={classes.padding}>
                      0
                    </Typography>
                  </div>
                </Link>
              </ListItem>
            </List>
          </div>
        </SwipeableDrawer>
      </div>
    );
  };

  const CreateAppbar = () => {
    return (
      <AppBar>
        <Toolbar>
          <Typography
            variant="headline"
            style={{ flexGrow: 1 }}
            color="inherit"
            className="navigation__Logo"
          >
            <Link to="/" className="navigation__link">
              My Store
            </Link>
          </Typography>

          {user ? (
            <>
              {user?.role === 0 && (
                <Link
                  to="/user/dashboard"
                  className={`navigation__link ${
                    history.location.pathname === "/user/dashboard" &&
                    "navigation__link--active"
                  }`}
                >
                  <Typography variant="subtitle1" className={classes.padding}>
                    My Account
                  </Typography>
                </Link>
              )}

              {user?.role === 1 && (
                <Link
                  to="/admin/dashboard"
                  className={`navigation__link ${
                    history.location.pathname === "/admin/dashboard" &&
                    "navigation__link--active"
                  }`}
                >
                  <Typography variant="subtitle1" className={classes.padding}>
                    Dashboard
                  </Typography>
                </Link>
              )}

              <Link to="/" className="navigation__link">
                <Typography
                  variant="subtitle1"
                  className={classes.padding}
                  onClick={() => {
                    dispatch(signOut());
                    history.push("/");
                  }}
                >
                  Logout
                </Typography>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className={`navigation__link ${
                  history.location.pathname === "/signup" &&
                  "navigation__link--active"
                }`}
              >
                <Typography variant="subtitle1" className={classes.padding}>
                  Sign Up
                </Typography>
              </Link>

              <Link
                to="/signin"
                className={`navigation__link ${
                  history.location.pathname === "/signin" &&
                  "navigation__link--active"
                }`}
              >
                <Typography variant="subtitle1" className={classes.padding}>
                  Sign In
                </Typography>
              </Link>
            </>
          )}
          <Link
            to="/cart"
            className={`navigation__link ${
              history.location.pathname === "/cart" &&
              "navigation__link--active"
            }`}
          >
            <div className="navigation__cartOption">
              <ShoppingBasketIcon className="navigation__cartCount" />
              <Typography variant="subtitle1" className={classes.padding}>
                0
              </Typography>
            </div>
          </Link>
        </Toolbar>
      </AppBar>
    );
  };

  return activateDrawer ? CreateDrawer() : CreateAppbar();
}

export default withRouter(Navigation);
