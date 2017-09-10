import React from "react";

export default ({ input,label,type, meta: { error, touched} }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} className="form-control" type={type}/>
      <div style={{marginBottom: '20px', color:'red'}}>
        {touched && error}
      </div>
    </div>
  );
};
