import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle} from '@fortawesome/free-brands-svg-icons'


import { Link, NavLink } from "react-router-dom";
import {
  Typography,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix
} from '../Elements'


export const Sidebar = () => {


  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-sm bg-white border border-blue-gray-100 justify-between rounded-none">
      <div>
        <div className=" p-2 text-center">
          <Typography variant="h6" color="blue-gray">
            Awesome App
          </Typography>
        </div>
        <List>
          <Link to={"/dashboard"} >
            <ListItem>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>
          <NavLink to={"/notes"} className={({ isActive, isPending }) =>
            isPending ? "bg-gray-400" : isActive ? "bg-gray-500" : ""
          }>
            <ListItem>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemPrefix>
              Notes
            </ListItem>
          </NavLink>
          <Link to={"/notifications"} >
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
        </List>
      </div>
      
      <div>
        <List>
          <Link to={"/notes"} >
            <ListItem>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemPrefix>
              Settings
            </ListItem>
          </Link>
          <Link to={"/notes"} >
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
