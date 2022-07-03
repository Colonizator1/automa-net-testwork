import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import CompanyHeader from './CompanyHeader';
import CompanyTable from './CompanyTable';
import CompanyAdd from './CompanyAdd';
import CompanyEdit from './CompanyEdit';
import CompaniesService from '../../services/companies'


const Company = () => {
  const [companiesData, setCompaniesData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
   CompaniesService.getAll().then((resp) => {
     console.log('resp', resp);
     setCompaniesData(resp.data.data);
    });
  }, []);

  const handleEdit = id => {
    const [company] = companiesData.filter(company => company.id === id);

    setSelectedCompany(company);
    console.log('edit company', company);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [company] = companiesData.filter(company => company.id === id);

        const companiesCopy = companiesData.filter(company => company.id !== id);
        CompaniesService.delete(company.id).then(resp => {
          console.log('company deleted resp', resp);
          if (resp.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: `${company.name}'s data has been deleted.`,
              showConfirmButton: false,
              timer: 1500,
            });
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
        setCompaniesData(companiesCopy);
      }
    });
  };

  return (
    <div className="ui text container" style={{ padding: '5em 0em' }}>
      <CompanyHeader
          isAdding={isAdding}
          isEditing={isEditing}
          setIsAdding={setIsAdding}
      />
      {!isAdding && !isEditing && (
          <CompanyTable
            companies={companiesData}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
      )}
      {isAdding && (
        <CompanyAdd
          companies={companiesData}
          setCompanies={setCompaniesData}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <CompanyEdit
          selectedCompany={selectedCompany}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default Company;
