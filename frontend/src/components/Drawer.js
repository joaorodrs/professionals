import { Drawer as MUIDrawer, List, ListItem, ListItemText, ListItemIcon, ListSubheader, Button } from '@material-ui/core'
import { Work, AssignmentInd } from '@material-ui/icons'

export const Drawer = ({ showDrawer, toggleDrawer, toggleComponent }) => {
  return (
    <MUIDrawer
      anchor="left"
      open={showDrawer}
      onClose={toggleDrawer}
    >
      <List
        component="nav"
        aria-labelledby="maxxi-fullstack-challenge-subheader"
        subheader={
          <ListSubheader component="div" id="maxxi-fullstack-challenge-subheader">
            Maxxi Fullstack Challenge
          </ListSubheader>
        }
        style={{ width: '100%' }}
      >
        <ListItem button onClick={() => toggleComponent('Tipos de profissional')}>
          <ListItemIcon>
            <Work />
          </ListItemIcon>
          <ListItemText>Tipos de profissional</ListItemText>
        </ListItem>
        <ListItem button onClick={() => toggleComponent('Profissionais')}>
          <ListItemIcon>
            <AssignmentInd />
          </ListItemIcon>
          <ListItemText>Profissionais</ListItemText>
        </ListItem>
      </List>
    </MUIDrawer>
  )
}