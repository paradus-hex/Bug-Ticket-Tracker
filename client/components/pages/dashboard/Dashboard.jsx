import jwt from 'jsonwebtoken';
import React from 'react';

const UserDashboard = () => {
  if (typeof window !== 'undefined') {
    let token = localStorage.getItem('token');
    const decoded = jwt.verify(token, 'SOMEBigSecretWord');
    var userId = decoded.id;
    console.log(decoded, userId);
  }
  return <div>UserDashboard</div>;
};

export default UserDashboard;
