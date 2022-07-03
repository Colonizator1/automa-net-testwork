import React, { useState } from 'react';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import CompaniesService from '../../services/companies'
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate} from "react-router-dom";

const CompanyAdd = ({ companies, setCompanies, setIsAdding }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('trial');
  const [address, setAddress] = useState('');
  const [createdAtDate, setCreatedAtDate] = useState(new Date());
  const navigate = useNavigate();
  const handleAdd = e => {
    e.preventDefault();

    if (!name || !status || !address || !createdAtDate) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newCompany = {
        name,
        status,
        address,
        created_at: createdAtDate,
    };

    companies.push(newCompany);
    CompaniesService.create(newCompany).then(resp => {
        console.log('created resp', resp);
        if (resp.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Added!',
                text: `Company "${resp.data.name}" has been Added.`,
                showConfirmButton: false,
                timer: 1500,
            });
            setCompanies(companies);
            setIsAdding(false);

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `smth wrong`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
  };

return (
    <form className="ui form" onSubmit={handleAdd}>
        <div className="fields">
            <div className="field">
                <label>Name</label>
                <input type="text"
                       name="first-name"
                       placeholder="Name"
                       onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="field">
                <label>Created At</label>
                <DatePicker
                    selected={createdAtDate}
                    onChange={(date) => setCreatedAtDate(date)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    maxDate={new Date()}
                    dropdownMode="select"
                />
            </div>
            <div className="field">
                <label>Status</label>
                <select className="ui fluid dropdown" onChange={(e) => setStatus(e.target.value)}>
                    <option value="trial">Trial</option>
                    <option value="customer">Customer</option>
                    <option value="dead">Dead</option>
                </select>
            </div>
        </div>
        <div className="field">
            <label>Address</label>
            <textarea rows="2" onChange={(e) => setAddress(e.target.value)}/>
        </div>
        <button
          className="ui primary button"
          type={"submit"}
        >
          Save
        </button>
        <button
          className="ui button"
          onClick={() => {
              setIsAdding(false);
              navigate('/companies');
          }}
        >
          Cancel
        </button>
    </form>
    );
};

export default CompanyAdd;
