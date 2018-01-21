import React from 'react';
import { Input, Button, Checkbox, Grid, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const Header = props =>
  (
    <Grid>
      <Grid.Row columns={1}>
        <Grid.Column textAlign="center">
          <h1>{props.value}</h1>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={1}>
        <Grid.Column textAlign="right">
          <Checkbox toggle onClick={() => props.onClick()} checked={props.hide} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={1}>
        <Grid.Column textAlign="left">
          <Label>
            Tasks
            <Label.Detail>{props.counter}</Label.Detail>
          </Label>
          <Label>
            Done
            <Label.Detail>{props.done_counter}</Label.Detail>
          </Label>
          <Label>
            Uncompleted
            <Label.Detail>{props.undone_counter}</Label.Detail>
          </Label>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={2}>
        <Grid.Column>
          <Input
            action={<Button onClick={() => props.addCollection()}> Add Collection </Button>}
            placeholder="Add New Collection..."
            value={props.collectionText}
            onChange={(event, data) => props.newCollection(event, data)}
          />
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button secondary to="/" as={Link} >Show all users</Button>
        </Grid.Column>
      </Grid.Row>

    </Grid>
  );
// const Header = props =>
//   (
//     <div>
//       <Topic>{props.value}</Topic>
//
//       <HeaderSwitch>
//         <Checkbox toggle onClick={() => props.onClick()} checked={props.hide} />
//       </HeaderSwitch>
//
//       <Button secondary to="/" as={Link} >Show all users</Button>
//
//       <p className="counter"><sub>{props.counter} Tasks </sub></p>
//       <p className="counter"><sub>{props.done_counter} Done </sub></p>
//       <p className="counter"><sub>{props.undone_counter} Uncompleted </sub></p>
//
//       <div>
//         <Input
//           action={<Button onClick={() => props.addCollection()}> Add Collection </Button>}
//           placeholder="Add New Collection..."
//           value={props.collectionText}
//           onChange={(event, data) => props.newCollection(event, data)}
//         />
//       </div>
//
//     </div>
//   );

export default Header;
