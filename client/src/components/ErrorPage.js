import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
   return (
      <div>
         <h2>Nothing to see here</h2>
         <Link to='/'>head back</Link>
      </div>
   );
}

export default ErrorPage;
