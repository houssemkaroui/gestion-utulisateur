import axios from 'axios';

export async function fetchUsers() {
    const response = await axios.get('http://localhost:4000/api/v1/posts');
    return response;
  }

export async function fetchUserById(userId) {
    const response = await axios.get('http://localhost:4000/api/v1/posts/'+ userId);
    return response;
  }
export async function deleteUser(userId) {
    const response = await axios.delete(""+'http://localhost:4000/api/v1/posts'+ '/'+ userId);
    return response;
}
export async function addUser(user) {
    const response = await axios.post(""+'http://localhost:4000/api/v1/posts',user);
    return response;
  }
export async function editUser(user) {
    const response = await axios.put(""+'http://localhost:4000/api/v1/posts' + '/' + user.id, user);
    return response;
  }


   
 
