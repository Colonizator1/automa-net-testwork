import React from 'react';
import { useNavigate } from "react-router-dom";

const CompanyHeader = ({ isAdding, isEditing, setIsAdding }) => {
  const navigate = useNavigate();

  return (
    <div>
        { isAdding && <h1 className="ui header">Add new company</h1>}
        { isEditing && <h1 className="ui header">Edit company</h1>}
        { (!isEditing && !isAdding) &&
            <div>
                <h1 className="ui header">Companies</h1>
                <div style={{ marginTop: '30px', marginBottom: '18px' }}>
                    <button onClick={() => {
                      navigate('/companies/create');
                      setIsAdding(true)
                    }} className="ui primary button">Add Company</button>
                </div>
            </div>
        }
    </div>
  );
};

export default CompanyHeader;
