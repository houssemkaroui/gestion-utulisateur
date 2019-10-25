import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import {fetchUsers,deleteUser} from "../../service/ApiService";



class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null


        }

        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);

    }
    state = {
        users: []
    }

    componentDidMount =()=>{
        fetchUsers().then(response => {
            this.setState({
                users: response.data
            });
        })
        .catch(error=>{
            alert('  problem ');
        });
    }
    
    
     

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        fetchUsers()
            .then((res) => {
                this.setState({users: res.data.result})
            });
    }

    deleteUser(userId) {
        deleteUser(userId)
        .then(res => {
               this.setState({users: this.state.users.filter(user => user._id != userId)});
           })
    }

    editUser(id) {
        this.props.history.push({
            pathname: '/edit-user',
            state: { id: id }
          });
    }

    addUser() {
        this.props.history.push('/add-user');
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Products Details</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addUser()}>
                    Add Products
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">name</TableCell>
                            <TableCell align="right">type</TableCell>
                            <TableCell align="right">price</TableCell>
                            <TableCell align="right">rating</TableCell>
                            <TableCell align="right">warranty_years</TableCell>
                            <TableCell align="right">available</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map(row => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row._id}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.rating}</TableCell>
                                <TableCell align="right">{row.warranty_years}</TableCell>
                                <TableCell align="right">{row.available}</TableCell>

                                <TableCell align="right" onClick={() => this.editUser(row._id)}><CreateIcon /></TableCell>
                                <TableCell align="right" onClick={() => this.deleteUser(row._id)}><DeleteIcon /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ListUserComponent;
