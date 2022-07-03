import React from 'react';
import {useNavigate} from "react-router-dom";
const CompanyTable = ({ companies, handleEdit, handleDelete }) => {
  const navigate = useNavigate();
  companies.forEach((company, i) => {
    company.id = i + 1;
    company.created_at = new Date(company.created_at).toLocaleDateString(
        [],
        { year: 'numeric', month: 'long', day: 'numeric' })
  });

  return (
      companies.length > 0 &&
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Status</th>
            <th>Address</th>
            <th>Created At</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => {
            return (
                <tr key={company.id.toString()}>
                  <td>{company.id}</td>
                  <td>{company.name}</td>
                  <td>{company.status}</td>
                  <td>{company.address}</td>
                  <td>{company.created_at}</td>
                  <td colSpan='2'>
                    <button
                      onClick={() => {
                        handleEdit(company.id);
                        navigate(`/companies/edit/${company.id}`)
                      }}
                      className="ui icon button"
                    ><i className="edit icon"></i></button>
                    <button
                      onClick={() => handleDelete(company.id)}
                      className="ui icon button"
                    ><i className="trash alternate icon"></i></button>
                  </td>
                </tr>
            )})}
        </tbody>
      </table>
  );
};

export default CompanyTable;
