import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {addUser} from "../../service/ApiService";
import Grid from '@material-ui/core/Grid';

class AddUserComponent extends Component{
    constructor(props){
        super(props);
        this.state ={
        
                name: '',
                type: '',
                price:'',
                rating:'',
                warranty_years:'',
                available:''
    
        
        }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {name: this.state.name, type: this.state.type, price: this.state.price, rating: this.state.rating, warranty_years: this.state.warranty_years, available: this.state.available};
        addUser(user)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/users');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <Grid container spacing={3} style={{justifyContent:"center",alignItems:"center"}}>
              
                <Grid item xs={8}>
                <Typography variant="h4" style={style}>Add Products</Typography>
                <form style={formContainer}>

                    <TextField type="text" placeholder="name" fullWidth margin="normal" name="name" value={this.state.name} onChange={this.onChange}/>

                    <TextField type="type" placeholder="type" fullWidth margin="normal" name="type" value={this.state.type} onChange={this.onChange}/>

                    <TextField type="number" placeholder="price " fullWidth margin="normal" name="price" value={this.state.price} onChange={this.onChange}/>

                    <TextField type="number" placeholder="rating " fullWidth margin="normal" name="rating" value={this.state.rating} onChange={this.onChange}/>

                    <TextField type="number" placeholder="awarranty_yearsge" fullWidth margin="normal" name="warranty_years" value={this.state.warranty_years} onChange={this.onChange}/>

                    <TextField select placeholder="available" fullWidth margin="normal" name="available" value={this.state.available} onChange={this.onChange}>
                        <option value="false">false</option>
                        <option value="true">true</option>
                    </TextField>

                    <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
            </form>
            </Grid>
            </Grid>
    </div>
        );
    }
}
const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'

}
export default AddUserComponent;