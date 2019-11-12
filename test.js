import React from 'react';
import './App.css';
const userListAPI = [
  {
    "id": 1,
    "name": "Leanne Graham"
  },
  {
    "id": 2,
    "name": "Ervin"
  },
  {
    "id": 3,
    "name": "Clementine Bauch"
  },
  {
    "id": 4,
    "name": "Patricia Lebsack"
  },
  {
    "id": 5,
    "name": "Chelsey Dietrich"
  },
  {
    "id": 6,
    "name": "Mrs. Dennis Schulistionst"
  },
  {
    "id": 7,
    "name": "Kurtis Weissnat"
  },
  {
    "id": 8,
    "name": "Nicholas Runolfsdottir Vaurs",
  },
  {
    "id": 9,
    "name": "Glenna"
  },
  {
    "id": 10,
    "name": "Clementina DuBuque"
  }
];
const inputStyle = {
  width : "300px",
  height : "50px",
  padding : "10px",
  borderColor : "black",
  borderWidth : "3px",
  borderStyle : "solid"
}
const btnStyle = {
  width : "200px",
  height : "50px",
  padding : "10px",
  margin : "10px",
  fontWeight : "600",
  fontSize : "14px",
  borderRadius : "9px"
}

const divStyle = {
  display : "flex"
}

const ulStyle = {
  lineHeight : "2"
}

const APIURL = "https://api.github.com/search/repositories?q=";
function App() {
  const [textVal, setTextVal] =  React.useState("");
  const [items, setItems] = React.useState([]);

  function querySearch (q) {
    setTextVal(q);
    fetch(APIURL + q)
    .then(data => data.json())
    .then(data => {
      setItems(data.items);
    })
  }

  function renderSearchList() {
    if (items && items.length) {
      return items.map(item => {
        return <li key={item.id}>{item.full_name}</li>
      }) 
    } else {
      return null;
    }
  }

  return (
    <div className="App">
     <h1>Auto Suggestion Box</h1>
     <input 
        type="text"
        value={textVal}
        onChange= {e => querySearch(e.target.value)} 
        placeholder ="Search Here"
        style={inputStyle}
        list="repo_lists"
      />
      <ul id="repo_lists">
        {renderSearchList()}
      </ul>
    </div>
  );
}

function UserList(props) {
  const {users} = props;
  return users.map(user=> {
    return (
      <li tabIndex={0} key={user.id}>{user.name}</li>
    )
  })
}


function Users() {
  const APPURL = "https://jsonplaceholder.typicode.com/users";
  const [users, setUsers] = React.useState([]);
  const [sortState, setSortState] = React.useState(1);
  const [userList, setList] = React.useState([]);
  function getUsers() {
    // fetch(APPURL)
    // .then(users => users.json())
    // .then(users => {
      setUsers(userListAPI);
      setList(userListAPI);
    // });
  }

  function sortList() {
    if (users.length) {
      const list = [...users];
      if (sortState === 1) {
        list.sort((a,b) => a.name.length - b.name.length);
        setList(list);
        setSortState(2);
      }
       
      if (sortState === 2) {
        list.sort((a,b) => b.name.length - a.name.length);
        setList(list);
        setSortState(3);
      }

      if (sortState === 3) {
        setList(list);
        setSortState(1);
      }
    }
  }
  return (
    <main className="App">
      <h1>User List</h1>
      <div style={divStyle}>
        <button onClick={getUsers} style={btnStyle}>Get Users</button>
        <button onClick={sortList} style={btnStyle}>Sort list by name's length</button>
      </div>
      <ul style={ulStyle}>
        <UserList users={userList} />
      </ul>
    </main>
    
  )
}


export default Users;
