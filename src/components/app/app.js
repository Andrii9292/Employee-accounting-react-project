import {Component} from "react";

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'John S.', salary: 800, increase: false, rise: true, id: 1},
        {name: 'Alexander J.', salary: 3000, increase: true, rise: false, id: 2},
        {name: 'Emily M.', salary: 1300, increase: false, rise: false, id: 3}
      ],
      term: '',
      filter: 'all'
    };
    this.maxId = 4;
  }
  
  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter((elem => elem.id !== id))
      }
    })
  }
  addItem = (name, salary) => {
    if(name.length < 3 || salary <= 0) {
      return this.state.data
    } else {
      const newItem = {
        name,
        salary,
        increase: false,
        rise: false,
        id: this.maxId++
      }
      this.setState(({data}) => {
        const newArr = [...data, newItem];
        return {
          data: newArr
        }
      });
    }
  }
  
  onToggleIncrease = (id) => {
    //this.setState(({data}) => {
    //  const index = data.findIndex(elem => elem.id === id)
    //
    //  const old = data[index]
    //  const newItem = {...old, increase: !old.increase};
    //  const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
    //  return {
    //    data: newArr
    //  }
    //})
    this.setState(({data}) => ({
      data: data.map(item => {
        if(item.id === id) {
          return {...item, increase: !item.increase}
        }
        return item
      })
    }))
  }
  onToggleRise = (id) => {
    //this.setState(({data}) => {
    //  const index = data.findIndex(elem => elem.id === id)
    //
    //  const old = data[index]
    //  const newItem = {...old, rise: !old.rise};
    //  const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
    //  return {
    //    data: newArr
    //  }
    //})
    this.setState(({data}) => ({
      data: data.map(item => {
        if(item.id === id) {
          return {...item, rise: !item.rise}
        }
        return item
      })
    }))
  }
  
  searchEmp = (items, term) => {
    if(term.length === 0) {
      return items
    }
    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }
  
  onUpdateSearch = term => {
    this.setState({term: term})
  }
  
  filterPost = (items, filter) => {
    switch(items) {
      case 'rise' :
        return items.filter(item => item.rise);
      case 'moreThen1000' :
        return items.filter(item => item.salary > 1000);
      default:
        return items;
    }
  }
  
  onFilterSelect = (filter) => {
    this.setState({filter})
  }
  
  render() {
    const {data, term, filter} = this.state;
    const totalEmployees = data.length;
    const increaseEmployees = data.filter(item => {
      return item.increase
    }).length
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);
    return (
      <div className="app">
        <AppInfo totalEmployees={totalEmployees}
                 increaseEmployees={increaseEmployees}/>
        
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
          <AppFilter filter={filter}
                     onFilterSelect={this.onFilterSelect}/>
        </div>
        
        <EmployeesList data={visibleData}
                       onDelete={this.deleteItem}
                       onToggleIncrease={this.onToggleIncrease}
                       onToggleRise={this.onToggleRise}/>
        <EmployeesAddForm onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
