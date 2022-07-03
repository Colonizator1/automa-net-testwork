import React from 'react';
import './App.css';
import Company from './routes/company';
import CompanyTable from "./routes/company/CompanyTable";
import CompanyEdit from "./routes/company/CompanyEdit";
import NoPage from "./routes/NoPage";
import {Routes, Route, Navigate} from "react-router-dom";
import CompanyAdd from "./routes/company/CompanyAdd";

function App() {
  return <Routes>
    <Route exact path="/" element={<Navigate replace to="/companies" />}>
    </Route>
    <Route path="/companies" element={<Company />}>
      <Route index element={<CompanyTable />} />
      <Route path="create" element={<CompanyAdd />} />
      <Route path="edit" element={<CompanyEdit />} />
      <Route path="*" element={<NoPage />} />
    </Route>
  </Routes>;
}

export default App;
