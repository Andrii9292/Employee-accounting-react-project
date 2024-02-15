import './employees-list-item.css';
import classNames from "classnames";

const EmployeesListItem = (props) => {
  
    const {name, salary, onDelete, onToggleIncrease, onToggleRise, increase, rise} = props
    
    const className = classNames("list-group-item d-flex justify-content-between", {
      increase: increase,
      like: rise
    })

    return (
      <li className={className}>
      <span className='list-group-item-label'
            onClick={onToggleRise}>
        {name}
      </span>
        <input type="text" className="list-group-item-input" defaultValue={`${salary}$`}/>
        <div className='d-flex justify-content-center align-items-center'>
          <button type="button"
                  className="btn-cookie btn-sm "
                  onClick={onToggleIncrease}
          >
            <i className="fas fa-cookie"></i>
          </button>
          
          <button type="button"
                  className="btn-trash btn-sm"
                  onClick={onDelete}>
            <i className="fas fa-trash"></i>
          </button>
          <i className="fas fa-star"></i>
        </div>
      </li>
    )
}

export default EmployeesListItem;