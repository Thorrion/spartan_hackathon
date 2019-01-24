import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';
import { AddChipsAction } from '../../stores/actions/chipsAction'
import { RemoveChipsAction } from '../../stores/actions/chipsAction'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = theme => ({
  container: {
  },
  root: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    marginTop: "2em",
    margin: "0 5vw"
  },
  input: {
    margin: theme.spacing.unit,
    width: '75vw',
    // marginLeft: '5vw'
  },
  title: {
    backgroundColor: "#e8e8e8",
    margin: "2vw 0",
    padding: "2vw 5vw",
    width: "100vw"
  },
  button: {
    // margin: theme.spacing.unit,
    color: "#039ce0",
    fontSize: "10vw"
  },
});

class ChipsArray extends React.Component {
  state = {
    chips: ""
  }

  addChips = () => {
    if(this.state.chips !== ""){
      this.props.AddChipsAction({
        chips : this.state.chips,
      })
      this.setState({chips: ""})
    } else {
      alert("Veuillez saisir votre item a ajouter.")
    }
  }

  handleDelete = data => () => {
    const chipData = [...this.props.chips.list];
    const chipToDelete = chipData.indexOf(data);
    this.props.RemoveChipsAction(chipToDelete)
  };


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>

      <p className={classes.title}>Principales catégories proposées</p>

      <Input
        placeholder="Ajoutez vos items"
        className={classes.input}
        value={this.state.chips}
        onChange={(e) => this.setState({chips: e.target.value})}
      />

      <Button className={classes.button} onClick={this.addChips}><i class="far fa-plus-square"></i></Button>
      
      { this.props.chips &&
        this.props.chips.list.map((chip, index) => {
          return(
            <Paper className={classes.root} elevation={1}>
              <ListItem>
                <ListItemText primary={chip.chips}/>
              </ListItem>
            </Paper>
          )
        })
      }
      </div>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  chips: state.chips
})

const mapDispatchToProps = {
  AddChipsAction,
  RemoveChipsAction,
}



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChipsArray));