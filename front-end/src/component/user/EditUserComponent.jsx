import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {fetchUserById} from "../../service/ApiService";
import {editUser,updateUser} from "../../service/ApiService";


class EditUserComponent extends Component {
    

   constructor(props){
        super(props);
       this.state = {
                id:'',
                name: '',
                type: '',
                price:'',
                rating:'',
                warranty_years:'',
                available:'',
         }
        
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
    }


    componentDidMount() {
        this.loadUser();

        
    }
    
    loadUser() {
        fetchUserById(this.props.location.state.id)
            .then((res) => {
                let user = res.data;
                this.setState({
                id: user._id,
                name: user.name,
                type: user.type,
                price: user.price,
                rating: user.rating,
                warranty_years: user.warranty_years,
                available:user.available,
            

                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveUser = (e) => {
        e.preventDefault();
        let user = {id: this.state.id, name: this.state.name, type: this.state.type, price: this.state.price, rating: this.state.rating, warranty_years: this.state.warranty_years,available: this.state.available};
        editUser(user)
            .then(res => {
                this.setState({message : 'Products added successfully.'});
                this.props.history.push('/users');
            });
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Edit products</Typography>
                <form>

                        <TextField type="text" placeholder="name" fullWidth margin="normal" name="name" readonly="true" value={this.state.name} onChange={this.onChange}/>

                        <TextField type="text" placeholder=" type" fullWidth margin="normal" name="type" value={this.state.type} onChange={this.onChange}/>

                        <TextField placeholder=" price" fullWidth margin="normal" name="price" value={this.state.price} onChange={this.onChange}/>

                        <TextField type="text" placeholder="rating" fullWidth margin="normal" name="rating" value={this.state.rating} onChange={this.onChange}/>

                        <TextField type="text" placeholder="warranty_years" fullWidth margin="normal" name="warranty_years" value={this.state.warranty_years} onChange={this.onChange}/>
                        <TextField type="text" placeholder="available" fullWidth margin="normal" name="available" value={this.state.available} onChange={this.onChange}/>

                        <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>

                </form>
            </div>
        );
    }
  
}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default EditUserComponent;