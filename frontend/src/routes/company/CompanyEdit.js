import React from 'react';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import CompaniesService from "../../services/companies";

/* For the learning purpose I decided to build it with a class */
class CompanyEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.selectedCompany;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleInputChange(event) {
    if (!isNaN(Date.parse(event))) {
      this.setState({
        created_at: event
      });
      return;
    }
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleUpdate(e) {
    e.preventDefault();
    if (!this.state.name || !this.state.status || !this.state.address || !this.state.created_at) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    CompaniesService.update(this.state.id, this.state).then(resp => {

      if (resp.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Edited!',
          text: `Company "${this.state.name}" has been edited.`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.props.setIsEditing(false)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: `Something is wrong`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  render() {
    return (
        <div className="small-container">
          <form className="ui form" onSubmit={this.handleUpdate}>
            <div className="fields">
              <div className="field">
                <label>Name</label>
                <input type="text"
                       name="name"
                       placeholder="Name"
                       value={this.state.name}
                       onChange={this.handleInputChange}
                />
              </div>
              <div className="field">
                <label>Created At</label>
                <DatePicker
                    name="created_at"
                    selected={new Date(this.state.created_at)}
                    onChange={this.handleInputChange}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    maxDate={new Date()}
                    dropdownMode="select"
                />
              </div>
            </div>
            <div className="field">
              <label>Status</label>
              <select className="ui fluid dropdown" name="status"
                      value={this.state.status}
                      onChange={this.handleInputChange}
              >
                <option value="trial">Trial</option>
                <option value="customer">Customer</option>
                <option value="dead">Dead</option>
              </select>
            </div>
            <div className="field">
              <label>Address</label>
              <textarea
                  rows="2"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleInputChange}
              >
          </textarea>
            </div>
            <button
                className="ui primary button"
                onClick={this.handleUpdate}
            >
              Update
            </button>
            <button
                className="ui button"
                onClick={() => {
                  this.isEdit = false;
                  this.props.setIsEditing(false);
                }}
            >
              Cancel
            </button>
          </form>
        </div>
    );
  }
}

export default CompanyEdit;
