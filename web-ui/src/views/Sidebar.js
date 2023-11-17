import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrosoft, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons'


import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Typography,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix
} from '../components/Elements'


export const Sidebar = () => {


  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-sm bg-white border border-blue-gray-100 justify-between">
      <div>
        <div className=" p-2 text-center">
          <Typography variant="h6" color="blue-gray">
            Awesome App
          </Typography>
        </div>
        <List>
          <Link to={"/dashboard"} unstable_viewTransition >
            <ListItem>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>
          <NavLink to={"/notes"} unstable_viewTransition className={({ isActive, isPending }) =>
            isPending ? "bg-gray-400" : isActive ? "bg-gray-500" : ""
          }>
            <ListItem>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemPrefix>
              Notes
            </ListItem>
          </NavLink>
          <Link to={"/notifications"} unstable_viewTransition >
            <ListItem>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemPrefix>
              Notifications
              <ListItemSuffix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemSuffix>
            </ListItem>
          </Link>
          <Link to={"/notes"} unstable_viewTransition >
            <ListItem>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemPrefix>
              Settings
            </ListItem>
          </Link>
          <Link to={"/notes"} unstable_viewTransition >
            <ListItem>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemPrefix>
              Billing
            </ListItem>
          </Link>
          <Link to={"/notes"} unstable_viewTransition >
            <ListItem>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </Link>
        </List>
      </div>
      
      <div>
        <List>
          
          <Link to={"/notes"} unstable_viewTransition >
            <ListItem>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemPrefix>
              Settings
            </ListItem>
          </Link>
          <Link to={"/notes"} unstable_viewTransition >
            <ListItem>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </Link>
        </List>
      </div>
    </Card>
  );
}
